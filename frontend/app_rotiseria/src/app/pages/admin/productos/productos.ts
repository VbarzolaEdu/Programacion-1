import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { CardProducto } from '../../../components/shared/producto/card-producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, Navbar, CardProducto],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos {
  productos = [
    { id: 1, nombre: 'Hamburguesa Clásica', categoria: 'Burger', precio: 1000, disponible: true, imagen: 'assets/buger1.jpg' },
    { id: 2, nombre: 'Hamburguesa Doble', categoria: 'Burger', precio: 1500, disponible: true, imagen: 'assets/buger1.jpg' },
    { id: 3, nombre: 'Veggie Deluxe', categoria: 'Burger', precio: 1200, disponible: false, imagen: 'assets/buger1.jpg' }
  ];

  navItems = [
    { icon: 'bi bi-house-door-fill', route: '/admin/home-index' },
    { icon: 'bi bi-box-seam', route: '/admin/productos' },
    { icon: 'bi bi-people-fill', route: '/admin/usuarios' },
    { icon: 'bi bi-tags-fill', route: '/admin/promociones' }
  ];

  // 🔧 Métodos de acción
  editarProducto(producto: any) {
    alert(`✏️ Editar producto: ${producto.nombre}`);
  }

  eliminarProducto(producto: any) {
    if (confirm(`¿Seguro que querés eliminar "${producto.nombre}"?`)) {
      this.productos = this.productos.filter(p => p.id !== producto.id);
    }
  }
}
