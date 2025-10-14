import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NavCliente } from '../../../components/nav-cliente/nav-cliente';
import { CardUsuario } from '../../../components/shared/usuario/card-usuario';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, Navbar, CardUsuario,Header],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil {
  usuario = {
    nombre: 'Francisco López',
    correo: 'fran@correo.com',
    rol: 'Cliente'
  };
}
