import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NavCliente } from '../../../components/nav-cliente/nav-cliente';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { Pagination } from '../../../components/shared/pagination/pagination';
import { Valoraciones as ValoracionesService } from '../../../services/valoraciones';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [CommonModule, Navbar, Header, Pagination],
  templateUrl: './calificaciones.html',
  styleUrls: ['./calificaciones.css']
})
export class Calificaciones implements OnInit {
  private valoracionesService = inject(ValoracionesService);
  
  calificaciones: any[] = [];
  cargando: boolean = false;
  error: string = '';

  // Datos de paginación
  currentPage: number = 1;
  totalPages: number = 1;
  totalItems: number = 0;
  itemsPerPage: number = 10;

  ngOnInit() {
    this.cargarCalificaciones();
  }

  cargarCalificaciones(page: number = 1) {
    this.cargando = true;
    this.error = '';
    this.currentPage = page;
    
    this.valoracionesService.getValoraciones({
      page: page,
      per_page: this.itemsPerPage
    }).subscribe({
      next: (response) => {
        console.log('Respuesta de valoraciones:', response);
        
        // Extraer datos de paginación
        this.totalPages = response.pages || 1;
        this.totalItems = response.total || 0;
        
        // El backend devuelve {valoraciones: [...], total, pages, page}
        const valoracionesData = response.valoraciones || [];
        
        this.calificaciones = valoracionesData.map((v: any) => ({
          id: v.id,
          usuario: this.obtenerNombreUsuario(v.user),
          comentario: v.comentario || 'Sin comentario',
          estrellas: v.puntuacion || 0,
          producto: this.obtenerNombreProducto(v.producto)
        }));
        
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar valoraciones:', error);
        this.error = 'Error al cargar las calificaciones';
        this.cargando = false;
      }
    });
  }

  obtenerNombreUsuario(user: any): string {
    if (!user) return 'Usuario desconocido';
    if (user.nombre && user.apellido) {
      return `${user.nombre} ${user.apellido}`;
    }
    return user.email || 'Usuario desconocido';
  }

  obtenerNombreProducto(producto: any): string {
    if (!producto) return '';
    return producto.nombre || '';
  }

  getEstrellas(cantidad: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}
