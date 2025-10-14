import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Header } from '../../components/shared/header/header';

@Component({
  selector: 'app-home',
  imports: [RouterLink,Header],
  templateUrl: './home.html',
  styleUrls:['./home.css']
})
export class Home {

}
