import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';
import { CartService, CartItem } from '../../../services/cart.service';

@Component({
  selector: 'app-cliente-home',
  standalone: true,
  imports: [NavCliente],
  templateUrl: './cliente-home.html',
  styleUrls: ['./cliente-home.css']
})
export class ClienteHome {
  constructor(
    private router: Router,
    private cart: CartService
  ) {}

  productos = [
    { id: 1, nombre: 'Hamburguesa Clásica', precio: 2500, imagen: 'assets/buger1.jpg' },
    { id: 2, nombre: 'Hamburguesa Doble', precio: 3200, imagen: 'assets/buger1.jpg' },
    { id: 3, nombre: 'Papas Fritas', precio: 1200, imagen: 'assets/papas.jpg' },
  ];

  irAHacerPedido(productoId: number) {
    this.router.navigate(['/cliente/hacer-pedido', productoId]);
  }

  agregarAlCarrito(producto: any) {
    const item: CartItem = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      cantidad: 1
    };
    this.cart.addItem(item);
    alert(`${producto.nombre} agregado al carrito 🛒`);
  }
}
