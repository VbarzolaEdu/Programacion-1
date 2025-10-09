import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Navbar, NavItem } from '../navbar/navbar';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [CommonModule, Navbar],
  templateUrl: './layout.html',
  styleUrls: ['./layout.css']
})
export class Layout {
  @Input() items: NavItem[] = [];
}
