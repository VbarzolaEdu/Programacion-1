import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../../components/shared/header/header';

@Component({
  selector: 'app-register',
  imports: [RouterModule,Header],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {

}
