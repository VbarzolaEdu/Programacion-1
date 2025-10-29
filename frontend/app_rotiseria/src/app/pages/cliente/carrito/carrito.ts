import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { CartService, CartItem } from '../../../services/cart.service';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { Pedidos } from '../../../services/pedidos';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, Navbar, Header],
  templateUrl: './carrito.html',
  styleUrls: ['./carrito.css']
})
export class Carrito implements OnInit {
  items: CartItem[] = [];
  cargando: boolean = false;

  constructor(
    private cart: CartService, 
    private router: Router,
    private pedidosService: Pedidos,
    private authService: Auth
  ) {}

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

  total() {
    return this.cart.getTotal();
  }

  confirmar() {
    // Validar que haya items en el carrito
    if (this.items.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    // Obtener el ID del usuario actual
    const userId = this.authService.getCurrentUserId();
    
    if (!userId) {
      alert('Error: Usuario no identificado. Por favor, inicie sesión nuevamente.');
      return;
    }

    this.cargando = true;

    // Preparar los datos del pedido
    const pedidoData = {
      id_user: userId,
      precio_final: this.total(),
      fecha: new Date().toISOString(),
      estado: 'Pendiente',
      productos: this.items.map(item => item.id) // Array de IDs de productos
    };

    // Enviar el pedido a la base de datos
    this.pedidosService.createPedido(pedidoData).subscribe({
      next: (response) => {
        alert('Pedido confirmado. ¡Gracias por tu compra!');
        this.cart.clear();
        this.cargando = false;
        this.router.navigate(['/cliente/pedidos']);
      },
      error: (error) => {
        alert('Error al confirmar el pedido. Por favor, intente nuevamente.');
        this.cargando = false;
      }
    });
  }
}