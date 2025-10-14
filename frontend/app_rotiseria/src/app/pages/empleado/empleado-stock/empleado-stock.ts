import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
// import { NavEmpleado } from '../../../components/nav-empleado/nav-empleado';

@Component({
  selector: 'app-empleado-stock',
  imports: [RouterModule,Navbar,Header],
  templateUrl: './empleado-stock.html',
  styleUrl: './empleado-stock.css'
})
export class EmpleadoStock {

}
