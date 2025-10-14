import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardUsuario } from '../../../components/shared/usuario/card-usuario';

@Component({
  selector: 'app-gdu',
  imports: [CommonModule, RouterModule, Navbar, Header, CardUsuario],
  templateUrl: './gdu.html',
  styleUrl: './gdu.css'
})
export class GDU {
  // Lista de usuarios para gestionar
  usuarios = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@correo.com', rol: 'empleado', estado: 'pendiente' },
    { id: 2, nombre: 'Ana Gómez', correo: 'ana@correo.com', rol: 'admin', estado: 'validado' },
    { id: 3, nombre: 'Carlos López', correo: 'carlos@correo.com', rol: 'cliente', estado: 'pendiente' },
    { id: 4, nombre: 'María Torres', correo: 'maria@correo.com', rol: 'cliente', estado: 'validado' }
  ];

  /**
   * Valida un usuario (aprobar su registro)
   */
  validarUsuario(usuario: any) {
    console.log('✅ Validando usuario:', usuario);
    // Aquí harías la petición HTTP al backend
    alert(`Usuario ${usuario.nombre} validado correctamente`);
  }

  /**
   * Bloquea un usuario
   */
  bloquearUsuario(usuario: any) {
    console.log('🚫 Bloqueando usuario:', usuario);
    // Aquí harías la petición HTTP al backend
    const confirmar = confirm(`¿Estás seguro de bloquear a ${usuario.nombre}?`);
    if (confirmar) {
      alert(`Usuario ${usuario.nombre} bloqueado`);
    }
  }
}
