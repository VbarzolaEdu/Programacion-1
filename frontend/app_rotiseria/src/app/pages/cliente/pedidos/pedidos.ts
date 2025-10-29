import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardPedido } from '../../../components/shared/card-pedido/card-pedido';
import { Pagination } from '../../../components/shared/pagination/pagination';
import { Pedidos as PedidosService } from '../../../services/pedidos';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, Navbar, Header, CardPedido, Pagination],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css']
})
export class Pedidos {
  cargando: boolean = false;
  pedidosFiltrados: any[] = [];
  
  // Datos de paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;
  
  constructor(
    private pedidoService: PedidosService,
    private router: Router,
    private authService: Auth
  ) {} 

  ngOnInit() {
    this.cargarPedidosDelCliente();
  }

  /**
   * Carga los pedidos del cliente actual con paginación
   */
  cargarPedidosDelCliente(page: number = 1) {
    this.cargando = true;
    this.currentPage = page;
    const userId = this.authService.getCurrentUserId();
    
    if (!userId) {
      alert('No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.');
      this.cargando = false;
      return;
    }

    // Filtrar pedidos por usuario en el backend con paginación
    this.pedidoService.getPedidos({ 
      id_user: userId,
      page: page,
      per_page: this.itemsPerPage
    }).subscribe({
      next: (response: any) => {
        // Extraer datos de paginación
        this.totalPages = response.pages || 1;
        this.totalItems = response.total || 0;

        // Extraer array de pedidos de la respuesta
        const todosPedidos = Array.isArray(response) 
          ? response 
          : (response.pedidos || []);
        
        // Mapear los datos al formato esperado por el card-pedido
        this.pedidosFiltrados = todosPedidos.map((p: any) => ({
          id: p.id,
          fecha: this.formatearFecha(p.fecha),
          total: p.precio_final || p.total || 0,
          estado: p.estado || 'Pendiente',
          nombre: this.obtenerNombreProductos(p.productos),
          imagen: this.obtenerImagenPrincipal(p.productos)
        }));
        
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar pedidos:', error);
        this.cargando = false;
        this.pedidosFiltrados = [];
        alert('Error al cargar tus pedidos. Intenta nuevamente.');
      }
    });
  }

  /**
   * Maneja el cambio de página
   */
  onPageChange(page: number) {
    this.cargarPedidosDelCliente(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Navega a la página de valoración del pedido
   */
  irAValorar(pedidoId: number): void {
    this.router.navigate(['/cliente/calificar', pedidoId]);
  }

  /**
   * Navega a la página de ver todas las calificaciones
   */
  verCalificaciones(): void {
    this.router.navigate(['/cliente/calificaciones']);
  }

  /**
   * Formatea la fecha para mostrar
   */
  formatearFecha(fecha: string): string {
    if (!fecha) return 'Fecha no disponible';
    
    try {
      const date = new Date(fecha);
      return date.toLocaleDateString('es-ES', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch (error) {
      return fecha;
    }
  }

  /**
   * Obtiene el nombre de los productos del pedido
   */
  obtenerNombreProductos(productos: any[]): string {
    if (!productos || productos.length === 0) {
      return 'Sin productos';
    }
    
    if (productos.length === 1) {
      return productos[0].nombre || 'Producto';
    }
    
    // Si hay múltiples productos, mostrar el primero y cantidad
    return `${productos[0].nombre} (+${productos.length - 1} más)`;
  }

  /**
   * Obtiene la imagen principal del primer producto
   */
  obtenerImagenPrincipal(productos: any[]): string {
    if (!productos || productos.length === 0) {
      return 'assets/buger1.jpg';
    }
    
    return productos[0].imagen || 'assets/buger1.jpg';
  }
}
