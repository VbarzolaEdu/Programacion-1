import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-cliente',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './nav-cliente.html',
  styleUrls: ['./nav-cliente.css']
})
export class NavCliente {}