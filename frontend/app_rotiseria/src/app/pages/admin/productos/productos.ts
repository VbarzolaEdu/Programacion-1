import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardProducto } from '../../../components/shared/producto/card-producto';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { Search } from '../../../components/shared/search/search';
import { Pagination } from '../../../components/shared/pagination/pagination';
import { Productos as ProductosService } from '../../../services/productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule, CardProducto, Navbar, Header, Search, Pagination],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos {
  cargando: boolean = false;
  arrayproductos: any[] = [];
  productosFiltrados: any[] = [];
  terminoBusqueda: string = '';

  // Propiedades de paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 12;

  // Modo edición
  productoEditando: any = null;
  modoEdicion: boolean = false;
  productoTemporal: any = {};

  // Modo agregar
  modoAgregar: boolean = false;
  nuevoProducto: any = {};

  constructor(
    private router: Router,
    private productoService: ProductosService
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  /**
   * Carga la lista de productos desde el backend
   */
  cargarProductos(nombre?: string, page: number = 1) {
    this.cargando = true;

    const params: any = {
      page: page,
      per_page: this.itemsPerPage
    };

    // Agregar filtro de nombre si existe
    if (nombre && nombre.trim()) {
      params.nombre = nombre.trim();
    }

    this.productoService.getProductos(params).subscribe({
      next: (response: any) => {
        // Verificar si la respuesta es un array o un objeto
        if (Array.isArray(response)) {
          this.arrayproductos = response;
          this.totalItems = response.length;
          this.totalPages = 1;
        } else if (response.productos && Array.isArray(response.productos)) {
          this.arrayproductos = response.productos;
          this.totalItems = response.total || response.productos.length;
          this.totalPages = response.pages || 1;
          this.currentPage = response.page || page;
        } else {
          this.arrayproductos = [];
          this.totalItems = 0;
          this.totalPages = 1;
        }
        
        // Agregar imagen por defecto si no existe y convertir disponibilidad
        this.arrayproductos = this.arrayproductos.map(p => ({
          ...p,
          imagen: p.imagen || 'assets/buger1.jpg',
          disponible: p.disponibilidad === 'disponible'
        }));
        
        this.productosFiltrados = [...this.arrayproductos];
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        this.arrayproductos = [];
        this.productosFiltrados = [];
        this.totalItems = 0;
        this.totalPages = 1;
        alert('Error al cargar productos. Verifica tu conexión.');
      }
    });
  }

  /**
   * Maneja la búsqueda desde el componente search
   */
  onBusqueda(termino: string): void {
    this.terminoBusqueda = termino;
    this.currentPage = 1;
    this.cargarProductos(termino, 1);
  }

  /**
   * Maneja el cambio de página
   */
  onPageChange(page: number): void {
    this.currentPage = page;
    this.cargarProductos(this.terminoBusqueda, page);
  }

  /**
   * Activa el modo edición para un producto
   */
  editarProducto(producto: any) {
    this.modoEdicion = true;
    this.productoEditando = producto;
    
    // Clonar los datos del producto para edición
    this.productoTemporal = {
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria || ''
    };
    
    // Scroll al formulario
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }, 100);
  }

  /**
   * Cancela la edición y vuelve a la vista de lista
   */
  cancelarEdicion() {
    this.modoEdicion = false;
    this.productoEditando = null;
    this.productoTemporal = {};
  }

  /**
   * Guarda los cambios del producto editado
   */
  guardarCambios() {
    const confirmar = confirm(`¿Guardar los cambios en "${this.productoTemporal.nombre}"?`);
    if (!confirmar) return;

    if (!this.productoEditando) return;

    // Preparar los datos en el formato que espera el backend
    const productoData = {
      nombre: this.productoTemporal.nombre,
      precio: this.productoTemporal.precio,
      categoria: this.productoTemporal.categoria || '',
      disponibilidad: 'disponible' // Siempre disponible por defecto
    };

    this.productoService.updateProducto(this.productoEditando.id, productoData).subscribe({
      next: (response) => {
        alert(`Producto "${this.productoTemporal.nombre}" actualizado correctamente`);
        
        // Actualizar el producto en el array local con la respuesta del backend
        const productoActualizado = {
          ...response,
          disponible: response.disponibilidad === 'disponible',
          imagen: response.imagen || 'assets/buger1.jpg'
        };
        
        const index = this.arrayproductos.findIndex(p => p.id === this.productoEditando.id);
        if (index !== -1) {
          this.arrayproductos[index] = productoActualizado;
        }
        
        const filteredIndex = this.productosFiltrados.findIndex(p => p.id === this.productoEditando.id);
        if (filteredIndex !== -1) {
          this.productosFiltrados[filteredIndex] = productoActualizado;
        }
        
        this.cancelarEdicion();
      },
      error: (error) => {
        alert('Error al actualizar el producto. Intenta nuevamente.');
      }
    });
  }

  /**
   * Elimina un producto de la base de datos
   */
  eliminarProducto(producto: any) {
    
    const deleteObservable = this.productoService.deleteProducto(producto.id);
    
    deleteObservable.subscribe({
      next: (response) => {
        // Remover el producto del array local para actualizar la UI
        this.arrayproductos = this.arrayproductos.filter(p => p.id !== producto.id);
        this.productosFiltrados = this.productosFiltrados.filter(p => p.id !== producto.id);
        alert(`Producto "${producto.nombre}" eliminado correctamente`);
      },
      error: (error) => {
        if (error.status === 403) {
          alert('No tienes permisos para eliminar este producto');
        } else if (error.status === 404) {
          alert('Producto no encontrado. URL: ' + error.url);
        } else if (error.status === 401) {
          alert('No estás autenticado. Por favor, inicia sesión nuevamente.');
        } else {
          alert(`Error al eliminar el producto: ${error.status} - ${error.message || 'Error desconocido'}`);
        }
      }
    });
    
  }

  /**
   * Activa el modo de agregar nuevo producto
   */
  activarModoAgregar() {
    this.modoAgregar = true;
    this.modoEdicion = false;
    this.nuevoProducto = {
      nombre: '',
      precio: 0,
      categoria: ''
    };
    setTimeout(() => window.scrollTo({ top: 0, behavior: 'smooth' }), 100);
  }

  /**
   * Cancela el modo de agregar producto
   */
  cancelarAgregar() {
    this.modoAgregar = false;
    this.nuevoProducto = {};
  }

  /**
   * Guarda el nuevo producto
   */
  guardarNuevoProducto() {
    if (!this.nuevoProducto.nombre || !this.nuevoProducto.precio) {
      alert('Por favor, completa al menos el nombre y el precio del producto.');
      return;
    }

    if (confirm('¿Estás seguro de que deseas crear este producto?')) {
      // Preparar los datos en el formato que espera el backend
      const productoData = {
        nombre: this.nuevoProducto.nombre,
        precio: this.nuevoProducto.precio,
        categoria: this.nuevoProducto.categoria || '',
        disponibilidad: 'disponible' // Siempre disponible por defecto
      };

      this.productoService.createProducto(productoData).subscribe({
        next: (response: any) => {
          // Agregar el nuevo producto a los arrays con conversión de disponibilidad
          const productoCreado = response.producto || response;
          const productoConvertido = {
            ...productoCreado,
            disponible: productoCreado.disponibilidad === 'disponible',
            imagen: productoCreado.imagen || 'assets/buger1.jpg'
          };
          
          this.arrayproductos.push(productoConvertido);
          this.productosFiltrados.push(productoConvertido);
          
          alert('Producto creado exitosamente');
          this.cancelarAgregar();
        },
        error: (error) => {
          alert(`Error al crear el producto: ${error.error?.message || error.message || 'Error desconocido'}`);
        }
      });
    }
  }
}
