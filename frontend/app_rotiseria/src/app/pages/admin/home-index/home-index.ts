import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
// import { NavAdmin } from '../../../components/nav-admin/nav-admin';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
// import { Layout } from '../../../components/shared/layout/layout';

@Component({
  selector: 'app-home-index',
  imports: [RouterModule,Navbar,Header],
  templateUrl: './home-index.html',
  styleUrl: './home-index.css'
})
export class HomeIndex {
  
}
