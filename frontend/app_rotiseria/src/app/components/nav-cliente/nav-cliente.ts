import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartService } from '../../services/cart.service'; // 👈 asegurate de la ruta

@Component({
  selector: 'app-nav-cliente',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './nav-cliente.html',
  styleUrls: ['./nav-cliente.css']
})
export class NavCliente {
  cantidad = 0;

  constructor(private cart: CartService) {
    this.cart.items$.subscribe(items => {
      this.cantidad = items.reduce((acc, i) => acc + i.cantidad, 0);
    });
  }
}
