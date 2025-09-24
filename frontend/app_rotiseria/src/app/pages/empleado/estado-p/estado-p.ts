import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavEmpleado } from '../../../components/nav-empleado/nav-empleado';

@Component({
  selector: 'app-estado-p',
  imports: [RouterModule,NavEmpleado],
  templateUrl: './estado-p.html',
  styleUrl: './estado-p.css'
})
export class EstadoP {

}
