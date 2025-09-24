import { Component } from '@angular/core';
import { NavAdmin } from '../../../components/nav-admin/nav-admin';

@Component({
  selector: 'app-productos',
  imports: [NavAdmin],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})
export class Productos {
  mostrarMensaje() {
    alert('El producto se ha eliminado correctamente.'); // Aquí va tu mensaje
  }
}
