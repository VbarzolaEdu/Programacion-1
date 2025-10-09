import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar, NavItem } from '../shared/navbar/navbar';

@Component({
  selector: 'app-nav-admin',
  standalone: true,
  imports: [CommonModule, Navbar],
  template: `<app-navbar [items]="navItems"></app-navbar>`,
  styleUrls: ['./nav-admin.css']
})
export class NavAdmin {
  navItems: NavItem[] = [
    { icon: 'bi bi-house-door-fill', route: '/admin/home-index' },
    { icon: 'bi bi-box-seam', route: '/admin/productos' },
    { icon: "bi bi-currency-dollar", route: '/admin/precios' },
    { icon: 'bi bi-list-ul', route: '/admin/pedidos' },
    { icon: "bi bi-percent", route: '/admin/promociones' },
    { icon: 'bi bi-person-fill', route: '/admin/usuarios' }
  ];
}
