import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface NavItem {
  icon: string;
  route: string;
}

export const NAV_CONFIG: Record<'admin' | 'empleado' | 'cliente', NavItem[]> = {
  admin: [
    { icon: 'bi bi-house-door-fill', route: '/admin/home-index' },
    { icon: 'bi bi-box-seam', route: '/admin/productos' },
    { icon: 'bi bi-currency-dollar', route: '/admin/precios' },
    { icon: 'bi bi-list-ul', route: '/admin/pedidos' },
    { icon: 'bi bi-percent', route: '/admin/promociones' },
    { icon: 'bi bi-person-fill', route: '/admin/usuarios' }
  ],
  empleado: [
    { icon: 'bi bi-house-door-fill', route: '/empleado/empleado-index' },
    { icon: 'bi bi-box-seam', route: '/empleado/empleado-stock' },
    { icon: 'bi bi-hourglass-split', route: '/empleado/estado-p' },
    { icon: 'bi bi-person-workspace', route: '/empleado/gdu' }
  ],
  cliente: [
    { icon: 'bi bi-house-door-fill', route: '/cliente/cliente-home' },
    { icon: 'bi bi-star-fill', route: '/cliente/calificaciones' },
    { icon: 'bi bi-bag-fill', route: '/cliente/pedidos' },
    { icon: 'bi bi-cart-fill', route: '/cliente/carrito' },
    { icon: 'bi bi-person-fill', route: '/cliente/perfil' }
  ]
};

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  items: NavItem[] = [];

  // 🔹 Simulación temporal (cuando tengas Auth, reemplazás esto) 
  simulatedRole: 'admin' | 'empleado' | 'cliente' = 'empleado';

  ngOnInit() {
    this.items = NAV_CONFIG[this.simulatedRole];
  }

  isToken() {
    return localStorage.getItem('token') ;
  }
}