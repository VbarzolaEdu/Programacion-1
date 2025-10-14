import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { NavCliente } from '../../../components/nav-cliente/nav-cliente';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [CommonModule, Navbar, Header],
  templateUrl: './calificaciones.html',
  styleUrls: ['./calificaciones.css']
})
export class Calificaciones {
  // Reseñas simuladas (para prueba o demo)
  calificaciones = [
    {
      usuario: 'Juan Pérez',
      comentario: 'Excelente atención y la hamburguesa llegó caliente 🔥',
      estrellas: 5,
      fecha: '2025-09-20'
    },
    {
      usuario: 'María López',
      comentario: 'Muy buena, aunque podría venir con más papas 🍟',
      estrellas: 4,
      fecha: '2025-09-18'
    },
    {
      usuario: 'Carlos Gómez',
      comentario: 'Demoró un poco el pedido pero el sabor es top 👌',
      estrellas: 3,
      fecha: '2025-09-15'
    }
  ];
}
