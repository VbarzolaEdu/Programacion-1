import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar, NavItem } from '../shared/navbar/navbar';

@Component({
  selector: 'app-nav-cliente',
  standalone: true,
  imports: [CommonModule, Navbar],
  template: `<app-navbar [items]="navItems"></app-navbar>`,
  styleUrls: ['./nav-cliente.css']
})
export class NavCliente {
  navItems: NavItem[] = [
    { icon: 'bi bi-house-door-fill', route: '/cliente/cliente-home' },
    { icon: 'bi bi-star-fill', route: '/cliente/calificaciones' },
    { icon: 'bi bi-bag-fill', route: '/cliente/pedidos' },
    { icon: 'bi bi-person-fill', route: '/cliente/perfil' }
  ];
}
