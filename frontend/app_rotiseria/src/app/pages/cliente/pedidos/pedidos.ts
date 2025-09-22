import { Component } from '@angular/core';
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [NavCliente],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class Pedidos {

}
