import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavEmpleado } from '../../../components/nav-empleado/nav-empleado';

@Component({
  selector: 'app-empleado-stock',
  imports: [RouterModule,NavEmpleado],
  templateUrl: './empleado-stock.html',
  styleUrl: './empleado-stock.css'
})
export class EmpleadoStock {

}
