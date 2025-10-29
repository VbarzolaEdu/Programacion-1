import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardUsuario } from '../../../components/shared/usuario/card-usuario';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { Search } from '../../../components/shared/search/search';
import { Router } from '@angular/router';
import { User } from '../../../services/user';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, Navbar, CardUsuario, Header, Search],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})

export class Usuarios {
  arrayusuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  cargando: boolean = false;
  terminoBusqueda: string = '';
  
  constructor(
    private router: Router,
    private UsuarioService: User)
  {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  /**
   * Carga la lista de usuarios desde el backend
   */
  cargarUsuarios() {
    this.cargando = true;
    this.UsuarioService.getUsuarios().subscribe({
      next: (response: any) => {
        this.arrayusuarios = response;
        this.aplicarFiltros();
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        alert('Error al cargar usuarios. Verifica tu conexión y permisos.');
      }
    });
  }

  /**
   * Aplica filtros de búsqueda
   */
  aplicarFiltros() {
    let resultado = [...this.arrayusuarios];

    // Filtro por búsqueda (nombre, apellidos, email)
    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.toLowerCase();
      resultado = resultado.filter(u => 
        u.nombre.toLowerCase().includes(termino) ||
        u.apellidos.toLowerCase().includes(termino) ||
        u.email.toLowerCase().includes(termino)
      );
    }

    this.usuariosFiltrados = resultado;
  }

  /**
   * Elimina un usuario de la base de datos
   */
  eliminarUsuario(usuario: any) {
    this.UsuarioService.deleteUsuario(usuario.id).subscribe({
      next: (response) => {
        this.arrayusuarios = this.arrayusuarios.filter(u => u.id !== usuario.id);
        this.aplicarFiltros();
        alert(`Usuario ${usuario.nombre} ${usuario.apellidos} eliminado correctamente`);
      },
      error: (error) => {
        if (error.status === 403) {
          alert('No tienes permisos para eliminar este usuario');
        } else if (error.status === 404) {
          alert('Usuario no encontrado');
        } else {
          alert('Error al eliminar el usuario. Intenta nuevamente.');
        }
      }
    });
  }

}