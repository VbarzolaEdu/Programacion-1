import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardPedido } from '../../../components/shared/card-pedido/card-pedido';

@Component({
  selector: 'app-estado-p',
  imports: [RouterModule, CommonModule, Navbar, Header, CardPedido],
  templateUrl: './estado-p.html',
  styleUrl: './estado-p.css'
})
export class EstadoP {
  pedidos = [
    {
      id: 1,
      cliente: 'Juan Pérez',
      fecha: '20:30',
      total: 10000,
      estado: 'Pendiente',
      imagen: 'assets/buger1.jpg'
    },
    {
      id: 2,
      cliente: 'María González',
      fecha: '21:15',
      total: 8500,
      estado: 'En Preparación',
      imagen: 'assets/buger1.jpg'
    },
    {
      id: 3,
      cliente: 'Carlos López',
      fecha: '22:00',
      total: 15000,
      estado: 'Listo para Entregar',
      imagen: 'assets/buger1.jpg'
    }
  ];

  cambiarEstado(pedido: any, nuevoEstado: string): void {
    pedido.estado = nuevoEstado;
    console.log(`Pedido ${pedido.id} cambiado a: ${nuevoEstado}`);
    // Aquí irá la llamada al backend
  }

  rechazarPedido(pedido: any): void {
    pedido.estado = 'Rechazado';
    console.log(`Pedido ${pedido.id} rechazado`);
    // Aquí irá la llamada al backend
  }
}
