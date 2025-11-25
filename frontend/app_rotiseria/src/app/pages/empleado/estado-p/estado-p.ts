import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardPedido } from '../../../components/shared/card-pedido/card-pedido';
import { Pagination } from '../../../components/shared/pagination/pagination';
import { DateSearch } from '../../../components/shared/date-search/date-search';
import { EstadoFilter } from '../../../components/shared/estado-filter/estado-filter';
import { Pedidos } from '../../../services/pedidos';

@Component({
  selector: 'app-estado-p',
  imports: [RouterModule, CommonModule, Navbar, Header, CardPedido, Pagination, DateSearch, EstadoFilter],
  templateUrl: './estado-p.html',
  styleUrl: './estado-p.css'
})
export class EstadoP {
  fechaFiltro: string = '';
  estadoFiltro: string = 'todos';
  cargando: boolean = false;
  pedidos: any[] = [];
  pedidosFiltrados: any[] = [];
  
  // Datos de paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;

  constructor(private pedidosService: Pedidos) {}

  ngOnInit() {
    this.cargarTodosLosPedidos();
  }

  /**
   * Carga todos los pedidos desde el backend con paginación
   */
  cargarTodosLosPedidos(page: number = 1, fecha?: string, estado?: string) {
    this.cargando = true;
    this.currentPage = page;
    
    const params: any = { 
      page: page, 
      per_page: this.itemsPerPage 
    };

    // Agregar filtro de fecha si existe
    if (fecha) {
      params.fecha = fecha;
    }

    // Agregar filtro de estado si existe y no es 'todos'
    if (estado && estado !== 'todos') {
      params.estado = estado;
    }
    
    this.pedidosService.getPedidos(params).subscribe({
      next: (response: any) => {
        // Extraer datos de paginación
        this.totalPages = response.pages || 1;
        this.totalItems = response.total || 0;
        
        // Extraer array de pedidos de la respuesta
        const todosPedidos = Array.isArray(response) 
          ? response 
          : (response.pedidos || []);
        
        // Mapear los datos al formato esperado por el card-pedido
        this.pedidos = todosPedidos.map((p: any) => ({
          id: p.id,
          cliente: this.obtenerNombreCliente(p.user),
          fecha: this.formatearFecha(p.fecha),
          total: p.precio_final || p.total || 0,
          estado: p.estado || 'Pendiente',
          imagen: this.obtenerImagenPrincipal(p.productos),
          // Guardar el objeto completo para actualizaciones
          _original: p
        }));
        
        this.pedidosFiltrados = [...this.pedidos];
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        this.pedidos = [];
        this.pedidosFiltrados = [];
        alert('Error al cargar los pedidos. Intenta nuevamente.');
      }
    });
  }

  /**
   * Maneja el cambio de página
   */
  onPageChange(page: number) {
    this.cargarTodosLosPedidos(page, this.fechaFiltro, this.estadoFiltro);
    // Scroll hacia arriba para mejor UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Filtra pedidos cuando cambia la fecha
   */
  filtrarPorFecha(fecha: string): void {
    this.fechaFiltro = fecha;
    this.cargarTodosLosPedidos(1, fecha, this.estadoFiltro);
  }

  /**
   * Filtra pedidos cuando cambia el estado
   */
  filtrarPorEstado(estado: string): void {
    this.estadoFiltro = estado;
    this.cargarTodosLosPedidos(1, this.fechaFiltro, estado);
  }

  cambiarEstado(pedido: any, nuevoEstado: string): void {
    // Confirmación especial para estado Rechazado
    if (nuevoEstado === 'Rechazado') {
      if (!confirm(`¿Estás seguro de rechazar el pedido #${pedido.id}?`)) {
        return; // Si cancela, no hacer nada
      }
    }
    
    this.pedidosService.updatePedido(pedido.id, { estado: nuevoEstado }).subscribe({
      next: (response) => {
        pedido.estado = nuevoEstado;
        alert(`✅ Pedido #${pedido.id} cambiado a: ${nuevoEstado}`);
      },
      error: (error) => {
        alert('❌ Error al cambiar el estado del pedido');
      }
    });
  }

  // rechazarPedido(pedido: any): void {
  //   // Simplemente llama a cambiarEstado con 'Rechazado'
  //   this.cambiarEstado(pedido, 'Rechazado');
  // }

  /**
   * Obtiene el nombre del cliente desde el objeto user
   */
  obtenerNombreCliente(user: any): string {
    if (!user) return 'Cliente desconocido';
    
    const nombre = user.nombre || user.name || '';
    const apellido = user.apellido || user.lastname || '';
    
    return nombre && apellido ? `${nombre} ${apellido}` : 
           nombre ? nombre : 
           user.email || 'Cliente desconocido';
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
   * Obtiene la imagen principal del primer producto
   */
  obtenerImagenPrincipal(productos: any[]): string {
    if (!productos || productos.length === 0) {
      return 'assets/buger1.jpg';
    }
    
    return productos[0].imagen || 'assets/buger1.jpg';
  }
}
