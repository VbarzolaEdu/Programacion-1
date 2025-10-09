import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, NavCliente,],
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
      estado: 'Entregado'
    },
    {
      id: 2,
      nombre: 'Hamburguesa Clásica',
      fecha: '07/10/2025',
      total: 1000,
      estado: 'En preparación'
    }
  ];

  irAValorar(pedidoId: number): void {

    console.log(`Navegando a calificaciones para el pedido ID: ${pedidoId}`);
    this.router.navigate(['/cliente/calificar', pedidoId]);

  }
}
