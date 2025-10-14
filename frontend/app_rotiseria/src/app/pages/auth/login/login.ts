import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from '../../../components/shared/header/header';

@Component({
  selector: 'app-login',
  imports: [RouterModule,Header],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

}
