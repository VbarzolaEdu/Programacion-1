import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardPedido } from '../../../components/shared/card-pedido/card-pedido';
import { Pedidos } from '../../../services/pedidos';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  imports: [RouterModule, CommonModule, FormsModule, Navbar, Header, CardPedido],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosAdmin {
  fechaFiltro: string = '';
  cargando: boolean = false;
  arraypedidos: any[] = [];
  pedidosFiltrados: any[] = [];

  constructor(
    private router: Router,
    private pedidoService: Pedidos
  ) {}

  ngOnInit() {
    this.cargarPedidos();
  }

  /**
   * Carga la lista de pedidos desde el backend
   */
  cargarPedidos() {
    this.cargando = true;
    this.pedidoService.getPedidos().subscribe({
      next: (response: any) => {
        console.log('✅ Pedidos cargados:', response);
        
        // Verificar si la respuesta es un array o un objeto
        if (Array.isArray(response)) {
          this.arraypedidos = response;
        } else if (response.pedidos && Array.isArray(response.pedidos)) {
          // Si viene en formato { pedidos: [...] }
          this.arraypedidos = response.pedidos;
        } else {
          console.error('Formato de respuesta inesperado:', response);
          this.arraypedidos = [];
        }
        
        this.aplicarFiltros();
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
   * Aplica filtros de fecha
   */
  aplicarFiltros() {
    let resultado = [...this.arraypedidos];

    // Filtro por fecha
    if (this.fechaFiltro) {
      const fechaBuscada = this.fechaFiltro.split('-').reverse().join('/');
      resultado = resultado.filter(p => 
        p.fecha && p.fecha.includes(fechaBuscada)
      );
    }

    this.pedidosFiltrados = resultado;
  }

  /**
   * Filtra pedidos cuando cambia la fecha
   */
  filtrarPorFecha(): void {
    console.log('Filtrando por fecha:', this.fechaFiltro);
    this.aplicarFiltros();
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
