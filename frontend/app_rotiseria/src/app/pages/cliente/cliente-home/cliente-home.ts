import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { CardProducto } from '../../../components/shared/producto/card-producto';
import { CartService } from '../../../services/cart.service';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { Search } from '../../../components/shared/search/search';
import { Pagination } from '../../../components/shared/pagination/pagination';
import { Auth } from '../../../services/auth';
import { User } from '../../../services/user';
import { Productos } from '../../../services/productos';
import { inject } from '@angular/core';

@Component({
  selector: 'app-cliente-home',
  standalone: true,
  imports: [CommonModule, Navbar, CardProducto, Header, Search, Pagination], 
  templateUrl: './cliente-home.html',
  styleUrls: ['./cliente-home.css']
})
export class ClienteHome {
 private authService = inject(Auth);
  userRole: string | null = null;
  userEstado: string | null = null;
  
  cargando: boolean = false;
  arrayproductos: any[] = [];
  productosFiltrados: any[] = [];
  terminoBusqueda: string = '';

  // Datos de paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 12;

  constructor(
    private router: Router, 
    private cart: CartService,
    private productoService: Productos,
    private userService: User
  ) {
    this.userRole = this.authService.getUserRole();
  }

  ngOnInit() {
    this.cargarEstadoUsuario();
    this.cargarProductos();
  }

  /**
   * Carga el estado actual del usuario desde el backend
   */
  cargarEstadoUsuario(): void {
    const userId = this.authService.getCurrentUserId();
    if (userId) {
      this.userService.getUsuario(userId).subscribe({
        next: (response: any) => {
          this.userEstado = response.estado || null;
        },
        error: (error) => {
          // Si hay error, usar el estado del token como fallback
          this.userEstado = this.authService.getUserEstado();
        }
      });
    } else {
      // Si no hay userId, usar el estado del token
      this.userEstado = this.authService.getUserEstado();
    }
  }

  /**
   * Verifica si el usuario puede agregar productos al carrito
   * Solo pueden agregar usuarios con estado 'activo'
   */
  puedeAgregar(): boolean {
    // Si el estado es bloqueado o pendiente, no puede agregar
    return this.userEstado === 'activo';
  }

  /**
   * Carga la lista de productos desde el backend
   */
  cargarProductos(nombre?: string, page: number = 1) {
    this.cargando = true;
    this.currentPage = page;
    
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
        // Extraer datos de paginación
        this.totalPages = response.pages || 1;
        this.totalItems = response.total || 0;

        // Extraer array de productos
        const productos = Array.isArray(response) 
          ? response 
          : (response.productos || []);
        
        // Agregar imagen por defecto si no existe y filtrar solo disponibles
        this.arrayproductos = productos
          .map((p: any) => ({
            ...p,
            imagen: p.imagen || 'assets/buger1.jpg'
          }))
          .filter((p: any) => p.disponible !== false);
        
        this.productosFiltrados = [...this.arrayproductos];
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        this.arrayproductos = [];
        this.productosFiltrados = [];
        alert('Error al cargar productos. Verifica tu conexión.');
      }
    });
  }

  /**
   * Maneja la búsqueda desde el componente search
   */
  onBusqueda(termino: string): void {
    this.terminoBusqueda = termino;
    this.cargarProductos(termino, 1);
  }

  /**
   * Maneja el cambio de página
   */
  onPageChange(page: number) {
    this.cargarProductos(this.terminoBusqueda, page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  agregarAlCarrito(p: any) {
    this.cart.addItem({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      cantidad: 1
    });
    alert(`🛒 ${p.nombre} agregado al carrito`);
  }
}
