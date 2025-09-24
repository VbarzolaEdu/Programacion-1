import { Component } from '@angular/core';
import { NavCliente } from '../../../components/nav-cliente/nav-cliente';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calificaciones',
  standalone: true,
  imports: [NavCliente],
  templateUrl: './calificaciones.html',
  styleUrl: './calificaciones.css'
})
export class Calificaciones {
    constructor(private router: Router) {}

  irACalificar() {
    this.router.navigate(['/cliente/calificar']);
  }


}
