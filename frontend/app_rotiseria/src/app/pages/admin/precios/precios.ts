import { Component } from '@angular/core';
import { NavAdmin } from '../../../components/nav-admin/nav-admin';

@Component({
  selector: 'app-precios',
  imports: [NavAdmin],
  templateUrl: './precios.html',
  styleUrl: './precios.css'
})
export class Precios {
 mostrarMensaje() {
    alert('Precio cambiado con éxito!'); // Aquí va tu mensaje
  }
}
