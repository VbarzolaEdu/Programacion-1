import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavEmpleado } from '../../../components/nav-empleado/nav-empleado';

@Component({
  selector: 'app-gdu',
  imports: [RouterModule,NavEmpleado],
  templateUrl: './gdu.html',
  styleUrl: './gdu.css'
})
export class GDU {

}
