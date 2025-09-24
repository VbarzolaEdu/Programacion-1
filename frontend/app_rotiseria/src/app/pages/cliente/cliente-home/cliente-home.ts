import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';

@Component({
  selector: 'app-cliente-home',
  standalone: true,
  imports: [NavCliente],
  templateUrl: './cliente-home.html',
  styleUrls: ['./cliente-home.css']
})
export class ClienteHome {
  constructor(private router: Router) {}

  irAHacerPedido(productoId: number) {
    this.router.navigate(['/cliente/hacer-pedido', productoId]);
  }
}