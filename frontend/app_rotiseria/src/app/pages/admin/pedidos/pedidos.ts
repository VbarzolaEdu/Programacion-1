import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardPedido } from '../../../components/shared/card-pedido/card-pedido';

@Component({
  selector: 'app-pedidos',
  imports: [RouterModule, CommonModule, FormsModule, Navbar, Header, CardPedido],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosAdmin {
  fechaFiltro: string = '';

  pedidos = [
    {
      id: 1234578,
      cliente: 'Pepe Honguito',
      fecha: '19/08/2025 - 22:15',
      total: 15000,
      estado: 'Entregado',
      imagen: 'assets/buger1.jpg'
    },
    {
      id: 1234579,
      cliente: 'María García',
      fecha: '20/08/2025 - 18:30',
      total: 8500,
      estado: 'En preparación',
      imagen: 'assets/buger1.jpg'
    },
    {
      id: 1234580,
      cliente: 'Juan Pérez',
      fecha: '21/08/2025 - 20:45',
      total: 12000,
      estado: 'Cancelado',
      imagen: 'assets/buger1.jpg'
    },
    {
      id: 1234581,
      cliente: 'Ana López',
      fecha: '22/08/2025 - 19:00',
      total: 9500,
      estado: 'Entregado',
      imagen: 'assets/buger1.jpg'
    }
  ];

  pedidosFiltrados = [...this.pedidos];

  filtrarPorFecha(): void {
    if (!this.fechaFiltro) {
      this.pedidosFiltrados = [...this.pedidos];
      return;
    }
    
    console.log('Filtrando por fecha:', this.fechaFiltro);
    // Aquí irá la lógica real de filtrado
    this.pedidosFiltrados = this.pedidos.filter(p => 
      p.fecha.includes(this.fechaFiltro.split('-').reverse().join('/'))
    );
  }

  editarPedido(pedido: any): void {
    console.log('Editando pedido:', pedido);
    // Aquí irá la lógica para abrir un modal o navegar a la página de edición
    alert(`Editar pedido #${pedido.id}`);
  }

  cancelarPedido(pedido: any): void {
    console.log('Cancelando pedido:', pedido);
    if (confirm(`¿Está seguro de cancelar el pedido #${pedido.id}?`)) {
      pedido.estado = 'Cancelado';
      // Aquí irá la llamada al backend
    }
  }
}
