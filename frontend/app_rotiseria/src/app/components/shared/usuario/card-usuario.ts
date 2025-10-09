import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-usuario',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-usuario.html',
  styleUrls: ['./card-usuario.css']
})
export class CardUsuario {
  @Input() nombre!: string;
  @Input() correo!: string;
  @Input() rol?: string;
}
