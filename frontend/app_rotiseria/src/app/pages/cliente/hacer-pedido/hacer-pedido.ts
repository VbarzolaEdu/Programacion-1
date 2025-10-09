import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';
import { CartService, CartItem } from '../../../services/cart.service';

@Component({
  selector: 'app-hacer-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, NavCliente],
  templateUrl: './hacer-pedido.html',
  styleUrls: ['./hacer-pedido.css']
})
export class HacerPedido implements OnInit {
  producto: any = null;
  ingredientes = [
    { nombre: 'Cebolla', incluido: true },
    { nombre: 'Queso cheddar', incluido: true },
    { nombre: 'Lechuga', incluido: false },
    { nombre: 'Tomate', incluido: false }
  ];
  nota: string = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private cart: CartService
  ) {}

  ngOnInit() {
    const data = localStorage.getItem('productoEditando');
    if (data) {
      this.producto = JSON.parse(data);
      localStorage.removeItem('productoEditando');
    } else {
      const id = Number(this.route.snapshot.paramMap.get('id'));
      this.producto = {
        id,
        nombre: id === 1 ? 'Producto 1' : 'Producto 2',
        precio: id === 1 ? 1000 : 1500,
        cantidad: 1
      };
    }
  }

  guardarCambios() {
    const actualizado: CartItem = {
      id: this.producto.id,
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      cantidad: this.producto.cantidad,
      extras: this.ingredientes.filter(i => i.incluido).map(i => i.nombre),
      nota: this.nota
    };
    this.cart.updateItem(actualizado);
    alert('✅ Pedido actualizado');
    this.router.navigate(['/cliente/carrito']);
  }

  agregarAlCarrito() {
    const nuevo: CartItem = {
      id: this.producto.id,
      nombre: this.producto.nombre,
      precio: this.producto.precio,
      cantidad: this.producto.cantidad,
      extras: this.ingredientes.filter(i => i.incluido).map(i => i.nombre),
      nota: this.nota
    };
    this.cart.addItem(nuevo);
    alert('🛒 Producto agregado');
    this.router.navigate(['/cliente/carrito']);
  }
}