import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardPedido } from '../../../components/shared/card-pedido/card-pedido';
import { Pagination } from '../../../components/shared/pagination/pagination';
import { Pedidos } from '../../../services/pedidos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  imports: [RouterModule, CommonModule, FormsModule, Navbar, Header, CardPedido, Pagination],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosAdmin {
  fechaFiltro: string = '';
  cargando: boolean = false;
  arraypedidos: any[] = [];
  pedidosFiltrados: any[] = [];

  // Datos de paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;

  // Modal de edición
  mostrarModal: boolean = false;
  pedidoEditando: any = null;
  formularioEdicion: any = {
    estado: '',
    precio_final: 0,
    fecha: ''
  };

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
  cargarPedidos(page: number = 1) {
    this.cargando = true;
    this.currentPage = page;

    const params: any = { 
      page: page, 
      per_page: this.itemsPerPage 
    };

    // Agregar filtro de fecha si existe
    if (this.fechaFiltro) {
      params.fecha = this.fechaFiltro;
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
        console.error('Error al cargar pedidos:', error);
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
  filtrarPorFecha(): void {
    // Recargar desde la primera página con el filtro aplicado
    this.cargarPedidos(1);
  }

  /**
   * Maneja el cambio de página
   */
  onPageChange(page: number) {
    this.cargarPedidos(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Abre el modal para editar un pedido
   */
  editarPedido(pedido: any): void {
    this.pedidoEditando = pedido;
    
    // Obtener datos originales del pedido
    const pedidoOriginal = pedido._original;
    
    // Pre-llenar el formulario con los datos actuales
    this.formularioEdicion = {
      estado: pedidoOriginal.estado || pedido.estado,
      precio_final: pedidoOriginal.precio_final || pedido.total,
      fecha: this.convertirFechaParaInput(pedidoOriginal.fecha)
    };
    
    this.mostrarModal = true;
  }

  /**
   * Cierra el modal de edición
   */
  cerrarModal(): void {
    this.mostrarModal = false;
    this.pedidoEditando = null;
    this.formularioEdicion = {
      estado: '',
      precio_final: 0,
      fecha: ''
    };
  }

  /**
   * Guarda los cambios del pedido editado
   */
  guardarCambios(): void {
    if (!this.pedidoEditando) return;

    const datosActualizados: any = {
      estado: this.formularioEdicion.estado,
      precio_final: Number(this.formularioEdicion.precio_final)
    };

    // Solo incluir fecha si se modificó
    if (this.formularioEdicion.fecha) {
      datosActualizados.fecha = new Date(this.formularioEdicion.fecha).toISOString();
    }

    this.pedidoService.updatePedido(this.pedidoEditando.id, datosActualizados).subscribe({
      next: (response) => {
        alert(`Pedido #${this.pedidoEditando.id} actualizado correctamente`);
        this.cerrarModal();
        // Recargar la página actual para ver los cambios
        this.cargarPedidos(this.currentPage);
      },
      error: (error) => {
        console.error('Error al actualizar pedido:', error);
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
   * Cancela un pedido
   */
  cancelarPedido(pedido: any): void {
    if (confirm(`¿Está seguro de cancelar el pedido #${pedido.id}?`)) {
      // Actualizar el estado del pedido en el backend usando el objeto original
      const pedidoOriginal = pedido._original || pedido;
      this.pedidoService.updatePedido(pedido.id, { estado: 'Cancelado' }).subscribe({
        next: (response) => {
          pedido.estado = 'Cancelado';
          alert(`Pedido #${pedido.id} cancelado correctamente`);
          // Recargar pedidos para reflejar cambios
          this.cargarPedidos(this.currentPage);
        },
        error: (error) => {
          console.error('Error al cancelar pedido:', error);
          alert('Error al cancelar el pedido. Intenta nuevamente.');
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
