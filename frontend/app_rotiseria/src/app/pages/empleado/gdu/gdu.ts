import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardUsuario } from '../../../components/shared/usuario/card-usuario';
import { User } from '../../../services/user';
import { Search } from '../../../components/shared/search/search';

@Component({
  selector: 'app-gdu',
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Header, CardUsuario, Search],
  templateUrl: './gdu.html',
  styleUrl: './gdu.css'
})
export class GDU {
  arrayusuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  cargando: boolean = false;
  terminoBusqueda: string = '';
  filtroActivo: string = 'todos'; // 'todos', 'pendientes', 'bloqueados', 'validados'

  constructor(private UsuarioService: User) {}

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
   * Aplica filtros de búsqueda y estado
   */
  aplicarFiltros() {
    let resultado = [...this.arrayusuarios];

    // Filtro por estado
    if (this.filtroActivo === 'pendientes') {
      resultado = resultado.filter(u => u.estado === 'pendiente' || u.estado === 'Pendiente');
    } else if (this.filtroActivo === 'bloqueados') {
      resultado = resultado.filter(u => u.estado === 'bloqueado' || u.estado === 'Bloqueado');
    } else if (this.filtroActivo === 'validados') {
      resultado = resultado.filter(u => u.estado === 'validado' || u.estado === 'Validado' || u.estado === 'activo' || u.estado === 'Activo');
    }

    // Filtro por búsqueda (nombre, email)
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
   * Cambia el filtro activo
   */
  cambiarFiltro(filtro: string) {
    this.filtroActivo = filtro;
    this.aplicarFiltros();
  }

  validarUsuario(usuario: any) {
    const confirmar = confirm(`¿Validar a ${usuario.nombre} ${usuario.apellidos}?`);
    if (!confirmar) return;

    const datosActualizados = { estado: 'activo' };
    
    this.UsuarioService.updateUsuario(usuario.id, datosActualizados).subscribe({
      next: (response) => {
        alert(`Usuario ${usuario.nombre} ${usuario.apellidos} validado correctamente`);
        usuario.estado = 'activo';
        this.aplicarFiltros();
      },
      error: (error) => {
        alert('Error al validar el usuario. Intenta nuevamente.');
      }
    });
  }

  /**
   * Bloquea un usuario
   */
  bloquearUsuario(usuario: any) {
    const confirmar = confirm(`¿Estás seguro de bloquear a ${usuario.nombre} ${usuario.apellidos}?`);
    if (!confirmar) return;

    const datosActualizados = { estado: 'bloqueado' };
    
    this.UsuarioService.updateUsuario(usuario.id, datosActualizados).subscribe({
      next: (response) => {
        alert(`Usuario ${usuario.nombre} ${usuario.apellidos} bloqueado`);
        usuario.estado = 'bloqueado';
        this.aplicarFiltros();
      },
      error: (error) => {
        alert('Error al bloquear el usuario. Intenta nuevamente.');
      }
    });
  }
}
