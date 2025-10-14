import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardPedido } from '../../../components/shared/card-pedido/card-pedido';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, Navbar, Header, CardPedido],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css']
})
export class Pedidos {
  
  constructor(private router: Router) {} 

  pedidos = [
    {
      id: 1,
      nombre: 'Hamburguesa Doble',
      fecha: '08/10/2025',
      total: 1500,
      estado: 'Entregado',
      imagen: 'assets/buger1.jpg'
    },
    {
      id: 2,
      nombre: 'Hamburguesa Clásica',
      fecha: '07/10/2025',
      total: 1000,
      estado: 'En preparación',
      imagen: 'assets/buger1.jpg'
    },
    {
      id: 3,
      nombre: 'Pizza Napolitana',
      fecha: '06/10/2025',
      total: 2000,
      estado: 'Entregado',
      imagen: 'assets/buger1.jpg'
    }
  ];

  irAValorar(pedidoId: number): void {
    console.log(`Navegando a calificaciones para el pedido ID: ${pedidoId}`);
    this.router.navigate(['/cliente/calificar', pedidoId]);
  }
}
