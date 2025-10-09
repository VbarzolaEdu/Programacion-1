import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavAdmin } from '../../../components/nav-admin/nav-admin';
import { CardUsuario } from '../../../components/shared/usuario/card-usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, NavAdmin, CardUsuario],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class Usuarios {
  usuarios = [
    { nombre: 'Juan Pérez', correo: 'juan@correo.com', rol: 'Empleado' },
    { nombre: 'Ana Gómez', correo: 'ana@correo.com', rol: 'Admin' }
  ];
}
