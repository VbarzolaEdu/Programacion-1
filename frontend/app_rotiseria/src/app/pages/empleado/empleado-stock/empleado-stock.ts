import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { CardProducto } from '../../../components/shared/producto/card-producto';
import { Productos as ProductosService } from '../../../services/productos';

@Component({
  selector: 'app-empleado-stock',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, Header, CardProducto],
  templateUrl: './empleado-stock.html',
  styleUrls: ['./empleado-stock.css']
})
export class EmpleadoStock {

  cargando: boolean = false;
  arrayproductos: any[] = [];
  productosFiltrados: any[] = [];

  constructor(
    private router: Router,
    private productoService: ProductosService
  ) {}

  ngOnInit() {
    this.cargarProductos();
  }

  /**
   * Carga la lista de productos desde el backend
   */
  cargarProductos() {
    this.cargando = true;
    this.productoService.getProductos().subscribe({
      next: (response: any) => {
        // Verificar si la respuesta es un array o un objeto
        if (Array.isArray(response)) {
          this.arrayproductos = response;
        } else if (response.productos && Array.isArray(response.productos)) {
          // Si viene en formato { productos: [...] }
          this.arrayproductos = response.productos;
        } else {
          this.arrayproductos = [];
        }
        
        // Agregar imagen por defecto si no existe y convertir disponibilidad
        this.arrayproductos = this.arrayproductos.map(p => ({
          ...p,
          imagen: p.imagen || 'assets/buger1.jpg',
          disponible: p.disponibilidad === 'disponible'
        }));
        
        this.productosFiltrados = [...this.arrayproductos];
        this.cargando = false;
      },
      error: (error) => {
        this.cargando = false;
        this.arrayproductos = [];
        this.productosFiltrados = [];
        alert('Error al cargar productos. Verifica tu conexión.');
      }
    });
  }

  /**
   * Cambia la disponibilidad de un producto
   */
  cambiarDisponibilidad(producto: any): void {
    const nuevoEstado = producto.disponible;
    
    // Preparar los datos para actualizar
    const productoData = {
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria || '',
      disponibilidad: nuevoEstado ? 'disponible' : 'no disponible'
    };

    this.productoService.updateProducto(producto.id, productoData).subscribe({
      next: (response) => {
        // Actualizar la disponibilidad en el backend response
        producto.disponibilidad = nuevoEstado ? 'disponible' : 'no disponible';
        
        // Actualizar en ambos arrays
        const index = this.arrayproductos.findIndex(p => p.id === producto.id);
        if (index !== -1) {
          this.arrayproductos[index] = {
            ...this.arrayproductos[index],
            disponible: nuevoEstado,
            disponibilidad: nuevoEstado ? 'disponible' : 'no disponible'
          };
        }
        
        const mensaje = nuevoEstado 
          ? `✅ "${producto.nombre}" marcado como disponible` 
          : `⚠️ "${producto.nombre}" marcado como no disponible`;
        alert(mensaje);
      },
      error: (error) => {
        // Revertir el cambio en caso de error
        producto.disponible = !nuevoEstado;
        
        let mensajeError = 'Error al actualizar la disponibilidad del producto.';
        if (error.status === 403) {
          mensajeError = '⛔ No tienes permisos para realizar esta acción. Verifica tu rol de empleado.';
        } else if (error.status === 401) {
          mensajeError = '🔒 Tu sesión ha expirado. Por favor, inicia sesión nuevamente.';
        } else if (error.error && typeof error.error === 'string') {
          mensajeError = `Error: ${error.error}`;
        }
        
        alert(mensajeError);
      }
    });
  }

}