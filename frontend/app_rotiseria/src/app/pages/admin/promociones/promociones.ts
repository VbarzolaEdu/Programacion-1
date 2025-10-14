import { Component } from '@angular/core';
// import { NavAdmin } from '../../../components/nav-admin/nav-admin';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';

@Component({
  selector: 'app-promociones',
  imports: [Navbar,Header],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css'
})
export class Promociones {
 mostrarMensaje() {
    alert('Promoción enviada con éxito'); 
  }
}
