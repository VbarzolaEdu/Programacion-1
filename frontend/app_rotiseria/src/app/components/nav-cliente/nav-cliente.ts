import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-nav-cliente',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './nav-cliente.html',
  styleUrls: ['./nav-cliente.css']
})
export class NavCliente {}