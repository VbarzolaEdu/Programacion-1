import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
// import { NavEmpleado } from '../../../components/nav-empleado/nav-empleado';

@Component({
  selector: 'app-empleado-index',
  imports: [RouterModule,Navbar,Header],
  templateUrl: './empleado-index.html',
  styleUrl: './empleado-index.css'
})
export class EmpleadoIndex {

}
