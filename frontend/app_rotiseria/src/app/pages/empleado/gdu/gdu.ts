import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardUsuario } from '../../../components/shared/usuario/card-usuario';
import { User } from '../../../services/user';
import { Search } from '../../../components/shared/search/search';
import { Pagination } from '../../../components/shared/pagination/pagination';

@Component({
  selector: 'app-gdu',
  imports: [CommonModule, RouterModule, FormsModule, Navbar, Header, CardUsuario, Search, Pagination],
  templateUrl: './gdu.html',
  styleUrl: './gdu.css'
})
export class GDU {
  arrayusuarios: any[] = [];
  usuariosFiltrados: any[] = [];
  cargando: boolean = false;
  terminoBusqueda: string = '';
  filtroActivo: string = 'todos'; // 'todos', 'pendientes', 'bloqueados', 'validados'
  
  // Datos de paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;

  constructor(private UsuarioService: User) {}

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
      page: this.currentPage,
      limit: this.itemsPerPage
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
        this.aplicarFiltroEstado();
        // Estimar total de items y páginas
        this.totalItems = this.usuariosFiltrados.length;
        this.totalPages = Math.max(1, Math.ceil(this.totalItems / this.itemsPerPage));
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        alert('Error al cargar usuarios. Verifica tu conexión y permisos.');
      }
    });
  }

  /**
   * Aplica filtro por estado (local, después de obtener del backend)
   */
  aplicarFiltroEstado() {
    let resultado = [...this.arrayusuarios];

    // Filtro por estado
    if (this.filtroActivo === 'pendientes') {
      resultado = resultado.filter(u => u.estado === 'pendiente' || u.estado === 'Pendiente');
    } else if (this.filtroActivo === 'bloqueados') {
      resultado = resultado.filter(u => u.estado === 'bloqueado' || u.estado === 'Bloqueado');
    } else if (this.filtroActivo === 'validados') {
      resultado = resultado.filter(u => u.estado === 'validado' || u.estado === 'Validado' || u.estado === 'activo' || u.estado === 'Activo');
    }

    this.usuariosFiltrados = resultado;
  }

  /**
   * Aplica filtros de búsqueda (llamando al backend)
   */
  aplicarFiltros() {
    // Reiniciar a la primera página cuando se busca
    this.currentPage = 1;
    this.cargarUsuarios();
  }

  /**
   * Maneja el cambio de página
   */
  onPageChange(page: number) {
    this.currentPage = page;
    this.cargarUsuarios();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  /**
   * Cambia el filtro activo
   */
  cambiarFiltro(filtro: string) {
    this.filtroActivo = filtro;
    this.aplicarFiltroEstado();
  }

  validarUsuario(usuario: any) {
    const confirmar = confirm(`¿Validar a ${usuario.nombre} ${usuario.apellidos}?`);
    if (!confirmar) return;

    const datosActualizados = { estado: 'activo' };
    
    this.UsuarioService.updateUsuario(usuario.id, datosActualizados).subscribe({
      next: (response) => {
        alert(`Usuario ${usuario.nombre} ${usuario.apellidos} validado correctamente`);
        usuario.estado = 'activo';
        this.aplicarFiltroEstado();
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
        this.aplicarFiltroEstado();
      },
      error: (error) => {
        alert('Error al bloquear el usuario. Intenta nuevamente.');
      }
    });
  }
}
