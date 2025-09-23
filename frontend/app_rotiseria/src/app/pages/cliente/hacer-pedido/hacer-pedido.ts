import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';

@Component({
  selector: 'app-hacer-pedido',
  standalone: true,
  imports: [NavCliente],
  templateUrl: './hacer-pedido.html',
  styleUrls: ['./hacer-pedido.css']
})
export class HacerPedido {
  productoId: number;

  constructor(private route: ActivatedRoute) {
    this.productoId = Number(this.route.snapshot.paramMap.get('id'));
  }

  confirmarPedido() {
    alert('¡Pedido realizado!');
  }
}