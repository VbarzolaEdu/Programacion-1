import { Component } from '@angular/core';
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [NavCliente],
  templateUrl: './perfil.html',
  styleUrl: './perfil.css'
})
export class Perfil {

}
