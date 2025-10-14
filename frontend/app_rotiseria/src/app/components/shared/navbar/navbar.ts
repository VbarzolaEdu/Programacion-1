import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Auth } from '../../../services/auth';
import { inject } from '@angular/core';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class Navbar implements OnInit {
  userRole: string | null = null;
  private authService = inject(Auth);

  ngOnInit() {
    this.userRole = this.authService.getUserRole();
  }

  isToken() {
    return localStorage.getItem('token');
  }
}