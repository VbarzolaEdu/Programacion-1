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
  
  // Configuración de paginación
  paginaActual: number = 1;
  limite: number = 100; // Cargar muchos usuarios a la vez
  
  constructor(
    private router: Router,
    private UsuarioService: User)
  {}

  ngOnInit() {
    this.cargarUsuarios();
  }

  /**
   * Carga la lista de usuarios desde el backend con filtros
   */
  cargarUsuarios() {
    this.cargando = true;
    
    // Preparar parámetros de filtrado
    const params: any = {
      page: this.paginaActual,
      limit: this.limite
    };
    
    // Si hay término de búsqueda, intentar filtrar por nombre, apellidos o email
    if (this.terminoBusqueda.trim()) {
      const termino = this.terminoBusqueda.trim();
      
      // Si el término parece un email (contiene @), filtrar por email
      if (termino.includes('@')) {
        params.email = termino;
      } else {
        // Si no, filtrar por nombre Y apellidos simultáneamente
        // El backend usa LIKE, así que busca en ambos campos
        params.nombre = termino;
        params.apellidos = termino;
      }
    }
    
    this.UsuarioService.getUsuarios(params).subscribe({
      next: (response: any) => {
        this.arrayusuarios = response;
        this.usuariosFiltrados = response;
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        alert('Error al cargar usuarios. Verifica tu conexión y permisos.');
      }
    });
  }

  /**
   * Aplica filtros llamando al backend
   */
  aplicarFiltros() {
    // Reiniciar a la primera página cuando se busca
    this.paginaActual = 1;
    this.cargarUsuarios();
  }

  /**
   * Elimina un usuario de la base de datos
   */
  eliminarUsuario(usuario: any) {
    this.UsuarioService.deleteUsuario(usuario.id).subscribe({
      next: (response) => {
        alert(`Usuario ${usuario.nombre} ${usuario.apellidos} eliminado correctamente`);
        // Recargar la lista después de eliminar
        this.cargarUsuarios();
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