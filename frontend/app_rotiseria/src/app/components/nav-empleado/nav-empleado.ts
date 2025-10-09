import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar, NavItem } from '../shared/navbar/navbar';

@Component({
  selector: 'app-nav-empleado',
  standalone: true,
  imports: [CommonModule, Navbar],
  template: `
    <app-navbar [items]="navItems"></app-navbar>
  `,
  styleUrls: ['./nav-empleado.css']
})
export class NavEmpleado {
  navItems: NavItem[] = [
    { icon: 'bi bi-house-door-fill', route: '/empleado/empleado-index' },
    { icon: 'bi bi-box-seam', route: '/empleado/empleado-stock' },
    { icon: 'bi bi-hourglass-split', route: '/empleado/estado-p' },
    { icon: 'bi bi-person-workspace', route: '/empleado/gdu' }
  ];
}
