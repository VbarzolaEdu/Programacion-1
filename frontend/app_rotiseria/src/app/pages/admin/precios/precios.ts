import { Component } from '@angular/core';
// import { NavAdmin } from '../../../components/nav-admin/nav-admin';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';


@Component({
  selector: 'app-precios',
  imports: [Navbar,Header],
  templateUrl: './precios.html',
  styleUrl: './precios.css'
})
export class Precios {
 mostrarMensaje() {
    alert('Precio cambiado con éxito!'); // Aquí va tu mensaje
  }
}
