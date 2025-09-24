import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavEmpleado } from '../../../components/nav-empleado/nav-empleado';

@Component({
  selector: 'app-empleado-index',
  imports: [RouterModule,NavEmpleado],
  templateUrl: './empleado-index.html',
  styleUrl: './empleado-index.css'
})
export class EmpleadoIndex {

}
