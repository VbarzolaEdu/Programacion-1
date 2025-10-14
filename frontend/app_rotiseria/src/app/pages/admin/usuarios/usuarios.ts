import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NavAdmin } from '../../../components/nav-admin/nav-admin';
import { CardUsuario } from '../../../components/shared/usuario/card-usuario';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, Navbar, CardUsuario,Header],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class Usuarios {
  usuarios = [
    { id: 1, nombre: 'Juan Pérez', correo: 'juan@correo.com', rol: 'empleado' },
    { id: 2, nombre: 'Ana Gómez', correo: 'ana@correo.com', rol: 'admin' },
    { id: 3, nombre: 'Carlos Ruiz', correo: 'carlos@correo.com', rol: 'cliente' }
  ];

  /**
   * Elimina un usuario (solo admin puede hacerlo)
   */
  eliminarUsuario(usuario: any) {
    console.log('🗑️ Eliminando usuario:', usuario);
    const confirmar = confirm(`¿Estás seguro de eliminar a ${usuario.nombre}?`);
    if (confirmar) {
      // Aquí harías la petición HTTP al backend
      this.usuarios = this.usuarios.filter(u => u.id !== usuario.id);
      alert(`Usuario ${usuario.nombre} eliminado correctamente`);
    }
  }
}
