import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { Valoraciones } from '../../../services/valoraciones';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [CommonModule, Navbar, Header],
  templateUrl: './calificaciones.html',
  styleUrls: ['./calificaciones.css']
})
export class Calificaciones implements OnInit {
  cargando: boolean = false;
  calificaciones: any[] = [];

  constructor(private valoracionesService: Valoraciones) {}

  ngOnInit() {
    this.cargarCalificaciones();
  }

  /**
   * Carga todas las valoraciones desde el backend
   */
  cargarCalificaciones() {
    this.cargando = true;
    
    this.valoracionesService.getValoraciones().subscribe({
      next: (response: any) => {
        let todasValoraciones = [];
        
        // Verificar si la respuesta es un array o un objeto con paginación
        if (Array.isArray(response)) {
          todasValoraciones = response;
        } else if (response.valoraciones && Array.isArray(response.valoraciones)) {
          todasValoraciones = response.valoraciones;
        } else {
          todasValoraciones = [];
        }
        
        // Mapear los datos al formato esperado por el HTML
        this.calificaciones = todasValoraciones.map((v: any) => ({
          usuario: this.obtenerNombreUsuario(v.user),
          comentario: v.comentario || 'Sin comentario',
          estrellas: v.puntuacion || 0,
          fecha: v.fecha || new Date().toISOString(),
          producto: this.obtenerNombreProducto(v.producto)
        }));
        
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        this.calificaciones = [];
      }
    });
  }

  /**
   * Obtiene el nombre del usuario
   */
  obtenerNombreUsuario(user: any): string {
    if (!user) return 'Usuario anónimo';
    
    const nombre = user.nombre || user.name || '';
    const apellido = user.apellido || user.lastname || '';
    
    return nombre && apellido ? `${nombre} ${apellido}` : 
           nombre ? nombre : 
           user.email || 'Usuario anónimo';
  }

  /**
   * Obtiene el nombre del producto
   */
  obtenerNombreProducto(producto: any): string {
    if (!producto) return '';
    return producto.nombre || producto.name || '';
  }

  /**
   * Genera un array de números para mostrar las estrellas
   */
  getEstrellas(cantidad: number): number[] {
    return Array(5).fill(0).map((_, i) => i + 1);
  }
}
