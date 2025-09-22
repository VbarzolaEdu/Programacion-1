import { Component } from '@angular/core';
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';

@Component({
  selector: 'app-cliente-home',
  standalone: true,
  imports: [NavCliente],
  templateUrl: './cliente-home.html',
  styleUrl: './cliente-home.css'
})
export class ClienteHome {

}
