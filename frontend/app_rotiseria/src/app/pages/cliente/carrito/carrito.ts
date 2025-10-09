import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';
import { CartService, CartItem } from '../../../services/cart.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, NavCliente],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito implements OnInit {
  items: CartItem[] = [];

  constructor(private cart: CartService, private router: Router) {}

  ngOnInit() {
    this.cart.items$.subscribe(items => this.items = items);
  }

  sumar(item: CartItem) {
    this.cart.updateCantidad(item.id, item.cantidad + 1);
  }

  restar(item: CartItem) {
    if (item.cantidad > 1) this.cart.updateCantidad(item.id, item.cantidad - 1);
  }

  eliminar(id: number) {
    this.cart.removeItem(id);
  }

  editar(id: number) {
    this.router.navigate(['/cliente/hacer-pedido', id]);
  }

  total() {
    return this.cart.getTotal();
  }

  confirmar() {
    alert('✅ Pedido confirmado. ¡Gracias por tu compra!');
    this.cart.clear();
  }
}
