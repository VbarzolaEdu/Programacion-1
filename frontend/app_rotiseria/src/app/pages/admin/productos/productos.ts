import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardProducto } from '../../../components/shared/producto/card-producto';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { Productos as ProductosService } from '../../../services/productos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, CardProducto, Navbar, Header],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos {
  cargando: boolean = false;
  arrayproductos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(
    private router: Router,
    private productoService: ProductosService
  ) {}

  ngOnInit() {
    console.log('🚀 Componente admin/productos iniciado');
    this.cargarProductos();
  }

  /**
   * Carga la lista de productos desde el backend
   */
  cargarProductos() {
    console.log('📦 Iniciando carga de productos...');
    this.cargando = true;
    this.productoService.getProductos().subscribe({
      next: (response: any) => {
        console.log('✅ Productos cargados:', response);
        
        // Verificar si la respuesta es un array o un objeto
        if (Array.isArray(response)) {
          this.arrayproductos = response;
        } else if (response.productos && Array.isArray(response.productos)) {
          // Si viene en formato { productos: [...] }
          this.arrayproductos = response.productos;
        } else {
          console.error('Formato de respuesta inesperado:', response);
          this.arrayproductos = [];
        }
        
        // Agregar imagen por defecto si no existe
        this.arrayproductos = this.arrayproductos.map(p => ({
          ...p,
          imagen: p.imagen || 'assets/buger1.jpg'
        }));
        
        this.productosFiltrados = [...this.arrayproductos];
        this.cargando = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar productos:', error);
        this.cargando = false;
        this.arrayproductos = [];
        this.productosFiltrados = [];
        alert('Error al cargar productos. Verifica tu conexión.');
      }
    });
  }

  /**
   * Edita un producto
   */
  editarProducto(producto: any) {
    console.log('📝 MÉTODO EDITAR LLAMADO');
    console.log('Editando producto:', producto);
    // Aquí iría la lógica para abrir un modal o navegar a una página de edición
    alert(`Editando: ${producto.nombre}`);
  }

  /**
   * Elimina un producto de la base de datos
   */
  eliminarProducto(producto: any) {
    
    const deleteObservable = this.productoService.deleteProducto(producto.id);
    console.log('⏳ Observable creado:', deleteObservable);
    
    deleteObservable.subscribe({
      next: (response) => {
        console.log('✅ Producto eliminado correctamente:', response);
        // Remover el producto del array local para actualizar la UI
        this.arrayproductos = this.arrayproductos.filter(p => p.id !== producto.id);
        this.productosFiltrados = this.productosFiltrados.filter(p => p.id !== producto.id);
        alert(`Producto "${producto.nombre}" eliminado correctamente`);
      },
      error: (error) => {
        console.error('❌ Error al eliminar producto:', error);
        console.error('❌ Status:', error.status);
        console.error('❌ Message:', error.message);
        console.error('❌ Error completo:', error);
        console.error('❌ URL intentada:', error.url);
        
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
    
    console.log('⏳ Subscribe ejecutado');
  }
}
