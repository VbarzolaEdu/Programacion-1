import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavAdmin } from '../../../components/nav-admin/nav-admin';

@Component({
  selector: 'app-pedidos',
  imports: [RouterModule,NavAdmin],
  templateUrl: './pedidos.html',
  styleUrl: './pedidos.css'
})
export class PedidosAdmin {

}
