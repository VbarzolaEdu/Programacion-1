import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav-admin',
  imports: [CommonModule,RouterModule],
  templateUrl: './nav-admin.html',
  styleUrl: './nav-admin.css'
})
export class NavAdmin {

}
