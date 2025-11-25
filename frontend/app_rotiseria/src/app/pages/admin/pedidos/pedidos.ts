import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardPedido } from '../../../components/shared/card-pedido/card-pedido';
import { Pagination } from '../../../components/shared/pagination/pagination';
import { DateSearch } from '../../../components/shared/date-search/date-search';
import { EstadoFilter } from '../../../components/shared/estado-filter/estado-filter';
import { Pedidos } from '../../../services/pedidos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  imports: [RouterModule, CommonModule, FormsModule, Navbar, Header, CardPedido, Pagination, DateSearch, EstadoFilter],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosAdmin {
  fechaFiltro: string = '';
  estadoFiltro: string = 'todos';
  cargando: boolean = false;
  arraypedidos: any[] = [];
  pedidosFiltrados: any[] = [];

  // Datos de paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;

  // Modo edición
  modoEdicion: boolean = false;
  pedidoEditando: any = null;
  pedidoTemporal: any = {};

  constructor(
    private router: Router,
    private pedidoService: Pedidos
  ) {}

  ngOnInit() {
    this.cargarPedidos();
  }

  /**
   * Carga la lista de pedidos desde el backend con paginación
   */
  cargarPedidos(page: number = 1, fecha?: string, estado?: string) {
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

    this.pedidoService.getPedidos(params).subscribe({
      next: (response: any) => {
        // Extraer datos de paginación
        this.totalPages = response.pages || 1;
        this.totalItems = response.total || 0;

        // Extraer array de pedidos
        const pedidos = Array.isArray(response) 
          ? response 
          : (response.pedidos || []);
        
        // Mapear los datos al formato esperado por el card-pedido
        this.arraypedidos = pedidos.map((p: any) => ({
          id: p.id,
          cliente: this.obtenerNombreCliente(p.user),
          fecha: this.formatearFecha(p.fecha),
          total: p.precio_final || p.total || 0,
          estado: p.estado || 'Pendiente',
          imagen: this.obtenerImagenPrincipal(p.productos),
          // Guardar el objeto completo para actualizaciones
          _original: p
        }));
        
        this.pedidosFiltrados = [...this.arraypedidos];
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        this.arraypedidos = [];
        this.pedidosFiltrados = [];
        alert('Error al cargar pedidos. Verifica tu conexión y permisos.');
      }
    });
  }

  /**
   * Filtra pedidos cuando cambia la fecha
   */
  filtrarPorFecha(fecha: string): void {
    this.fechaFiltro = fecha;
    // Recargar desde la primera página con el filtro aplicado
    this.cargarPedidos(1, fecha, this.estadoFiltro);
  }

  /**
   * Filtra pedidos cuando cambia el estado
   */
  filtrarPorEstado(estado: string): void {
    this.estadoFiltro = estado;
    // Recargar desde la primera página con el filtro aplicado
    this.cargarPedidos(1, this.fechaFiltro, estado);
  }

  /**
   * Maneja el cambio de página
   */
  onPageChange(page: number) {
    this.cargarPedidos(page, this.fechaFiltro, this.estadoFiltro);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Edita un pedido
   */
  editarPedido(pedido: any): void {
    this.modoEdicion = true;
    this.pedidoEditando = pedido;
    
    // Crear copia temporal para editar
    this.pedidoTemporal = {
      id: pedido.id,
      precio_final: pedido.total,
      estado: pedido.estado,
      fecha: this.convertirFechaParaInput(pedido.fecha)
    };

    // Scroll hacia arriba para ver el formulario
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Cancela la edición del pedido
   */
  cancelarEdicion(): void {
    this.modoEdicion = false;
    this.pedidoEditando = null;
    this.pedidoTemporal = {};
  }

  /**
   * Guarda los cambios del pedido editado
   */
  guardarCambios(): void {
    if (!this.pedidoTemporal.precio_final || this.pedidoTemporal.precio_final <= 0) {
      alert('El precio debe ser mayor a 0');
      return;
    }

    if (!this.pedidoTemporal.estado) {
      alert('Debes seleccionar un estado');
      return;
    }

    if (!this.pedidoTemporal.fecha) {
      alert('Debes seleccionar una fecha');
      return;
    }

    const datosActualizar = {
      precio_final: this.pedidoTemporal.precio_final,
      estado: this.pedidoTemporal.estado,
      fecha: this.pedidoTemporal.fecha
    };

    this.pedidoService.updatePedido(this.pedidoEditando.id, datosActualizar).subscribe({
      next: (response) => {
        // Actualizar el pedido en la lista
        this.pedidoEditando.total = this.pedidoTemporal.precio_final;
        this.pedidoEditando.estado = this.pedidoTemporal.estado;
        this.pedidoEditando.fecha = this.formatearFecha(this.pedidoTemporal.fecha);
        
        alert('✅ Pedido actualizado correctamente');
        this.cancelarEdicion();
        
        // Recargar pedidos para asegurar sincronización
        this.cargarPedidos(this.currentPage);
      },
      error: (error) => {
        alert('Error al actualizar el pedido. Intenta nuevamente.');
      }
    });
  }

  /**
   * Convierte fecha ISO a formato yyyy-MM-dd para input date
   */
  convertirFechaParaInput(fecha: string): string {
    if (!fecha) return '';
    try {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      return '';
    }
  }

  /**
   * Elimina un pedido del sistema
   */
  eliminarPedido(pedido: any): void {
    if (confirm(`⚠️ ¿Está seguro de eliminar permanentemente el pedido #${pedido.id}?\n\nEsta acción no se puede deshacer.`)) {
      this.pedidoService.deletePedido(pedido.id).subscribe({
        next: (response) => {
          alert(`✅ Pedido #${pedido.id} eliminado correctamente`);
          
          // Eliminar de los arrays locales
          this.arraypedidos = this.arraypedidos.filter(p => p.id !== pedido.id);
          this.pedidosFiltrados = this.pedidosFiltrados.filter(p => p.id !== pedido.id);
          
          // Recargar pedidos para reflejar cambios y actualizar paginación
          this.cargarPedidos(this.currentPage);
        },
        error: (error) => {
          alert('❌ Error al eliminar el pedido. Intenta nuevamente.');
        }
      });
    }
  }

  /**
   * Obtiene el nombre del cliente desde el objeto user
   */
  obtenerNombreCliente(user: any): string {
    if (!user) return 'Cliente desconocido';
    return user.nombre && user.apellido 
      ? `${user.nombre} ${user.apellido}` 
      : user.email || 'Cliente sin nombre';
  }

  /**
   * Formatea la fecha de ISO a formato legible
   */
  formatearFecha(fecha: string): string {
    if (!fecha) return 'Fecha no disponible';
    try {
      const date = new Date(fecha);
      const dia = date.getDate().toString().padStart(2, '0');
      const mes = (date.getMonth() + 1).toString().padStart(2, '0');
      const anio = date.getFullYear();
      const horas = date.getHours().toString().padStart(2, '0');
      const minutos = date.getMinutes().toString().padStart(2, '0');
      return `${dia}/${mes}/${anio} ${horas}:${minutos}`;
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
    const primerProducto = productos[0];
    return primerProducto.imagen || 'assets/buger1.jpg';
  }
}
