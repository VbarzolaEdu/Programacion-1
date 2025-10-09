import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-producto',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './card-producto.html',
  styleUrls: ['./card-producto.css']
})
export class CardProducto {
  @Input() nombre!: string;
  @Input() categoria?: string;
  @Input() precio!: number;
  @Input() imagen?: string;
  @Input() disponible?: boolean; // 👈 AGREGA ESTA LÍNEA
}
