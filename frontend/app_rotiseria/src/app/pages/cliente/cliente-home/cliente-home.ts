import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';
import { CardProducto } from '../../../components/shared/producto/card-producto';
import { CartService } from '../../../services/cart.service';

@Component({
  selector: 'app-cliente-home',
  standalone: true,
  imports: [CommonModule, NavCliente, CardProducto], 
  templateUrl: './cliente-home.html',
  styleUrls: ['./cliente-home.css']
})
export class ClienteHome {
  productos = [
    {
      id: 1,
      nombre: 'Hamburguesa Clásica',
      categoria: 'Burger',
      precio: 1000,
      imagen: 'assets/buger1.jpg'
    },
    {
      id: 2,
      nombre: 'Hamburguesa Doble',
      categoria: 'Burger',
      precio: 1500,
      imagen: 'assets/buger1.jpg'
    },
    {
      id: 3,
      nombre: 'Hamburguesa Veggie',
      categoria: 'Burger',
      precio: 1200,
      imagen: 'assets/buger1.jpg'
    }
  ];

  constructor(private router: Router, private cart: CartService) {}

  irAHacerPedido(id: number) {
    this.router.navigate(['/cliente/hacer-pedido', id]);
  }

  agregarAlCarrito(p: any) {
    this.cart.addItem({
      id: p.id,
      nombre: p.nombre,
      precio: p.precio,
      cantidad: 1
    });
    alert(`🛒 ${p.nombre} agregado al carrito`);
  }
}