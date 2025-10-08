import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavAdmin } from '../../../components/nav-admin/nav-admin';
import { RouterModule } from '@angular/router';

interface Producto {
  id: number;
  nombre: string;
  categoria: string;
  precio: number;
  disponible: boolean;
  imagen: string;
}

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, RouterModule, NavAdmin],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos {
  productos: Producto[] = [
    {
      id: 1,
      nombre: 'Hamburguesa Triple',
      categoria: 'Burger',
      precio: 12000,
      disponible: true,
      imagen: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
    },
    {
      id: 2,
      nombre: 'Hamburguesa Doble',
      categoria: 'Burger',
      precio: 9500,
      disponible: true,
      imagen: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
    },
    {
      id: 3,
      nombre: 'Veggie Deluxe',
      categoria: 'Veggie',
      precio: 11000,
      disponible: false,
      imagen: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
    }
  ];

  eliminarProducto(id: number) {
    const producto = this.productos.find(p => p.id === id);
    if (producto && confirm(`¿Seguro que querés eliminar "${producto.nombre}"?`)) {
      this.productos = this.productos.filter(p => p.id !== id);
      alert('✅ Producto eliminado correctamente');
    }
  }

  editarProducto(id: number) {
    alert(`Editar producto con ID ${id}`);
  }
}
