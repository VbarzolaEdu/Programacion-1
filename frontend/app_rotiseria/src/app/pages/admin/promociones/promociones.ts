import { Component } from '@angular/core';
import { NavAdmin } from '../../../components/nav-admin/nav-admin';

@Component({
  selector: 'app-promociones',
  imports: [NavAdmin],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css'
})
export class Promociones {
 mostrarMensaje() {
    alert('Promoción enviada con éxito'); 
  }
}
