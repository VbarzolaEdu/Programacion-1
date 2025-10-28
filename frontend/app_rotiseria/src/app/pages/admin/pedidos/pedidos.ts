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
        
        this.arraypedidos = pedidos;
        this.pedidosFiltrados = [...this.arraypedidos];
        this.cargando = false;
      },
      error: (error) => {
        console.error('❌ Error al cargar pedidos:', error);
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
   * Edita un pedido
   */
  editarPedido(pedido: any): void {
    console.log('Editando pedido:', pedido);
    alert(`Editar pedido #${pedido.id}`);
    // Aquí puedes implementar la lógica para editar
  }

  /**
   * Cancela un pedido
   */
  cancelarPedido(pedido: any): void {
    console.log('Cancelando pedido:', pedido);
    if (confirm(`¿Está seguro de cancelar el pedido #${pedido.id}?`)) {
      // Actualizar el estado del pedido en el backend
      this.pedidoService.updatePedido(pedido.id, { estado: 'Cancelado' }).subscribe({
        next: (response) => {
          console.log('✅ Pedido cancelado:', response);
          pedido.estado = 'Cancelado';
          alert(`Pedido #${pedido.id} cancelado correctamente`);
        },
        error: (error) => {
          console.error('❌ Error al cancelar pedido:', error);
          alert('Error al cancelar el pedido. Intenta nuevamente.');
        }
      });
    }
  }
}
