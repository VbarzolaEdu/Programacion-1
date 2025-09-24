import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavAdmin } from '../../../components/nav-admin/nav-admin';

@Component({
  selector: 'app-home-index',
  imports: [RouterModule,NavAdmin],
  templateUrl: './home-index.html',
  styleUrl: './home-index.css'
})
export class HomeIndex {
  
}
