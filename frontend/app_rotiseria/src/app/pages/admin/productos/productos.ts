import { Component } from '@angular/core';
import { NavAdmin } from '../../../components/nav-admin/nav-admin';
import { CardProducto } from '../../../components/shared/producto/card-producto';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [NavAdmin, CardProducto],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class Productos {
  productos = [
    {
      id: 1,
      nombre: 'Triple',
      categoria: 'Burger',
      precio: 12000,
      disponible: true,
      imagen: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
    },
    {
      id: 2,
      nombre: 'Doble Bacon',
      categoria: 'Burger',
      precio: 11000,
      disponible: false,
      imagen: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
    },
    {
      id: 3,
      nombre: 'Veggie Deluxe',
      categoria: 'Burger',
      precio: 9500,
      disponible: true,
      imagen: 'https://cdn-icons-png.flaticon.com/512/3075/3075977.png'
    }
  ];

  editarProducto(p: any) {
    alert(`✏️ Editando ${p.nombre}`);
  }

  eliminarProducto(p: any) {
    const confirmacion = confirm(`¿Seguro que querés eliminar ${p.nombre}?`);
    if (confirmacion) {
      this.productos = this.productos.filter(prod => prod.id !== p.id);
      alert(`🗑 ${p.nombre} eliminado`);
    }
  }
}
