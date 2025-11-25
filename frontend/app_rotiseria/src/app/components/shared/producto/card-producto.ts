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
  /** ID del producto */
  @Input() id!: number;
  
  /** Nombre del producto */
  @Input() nombre!: string;
  
  /** Categoría del producto (ej: Hamburguesas, Bebidas) */
  @Input() categoria?: string;
  
  /** Precio del producto */
  @Input() precio!: number;
  
  /** Descripción del producto */
  @Input() descripcion?: string;
  
  /** URL de la imagen del producto */
  @Input() imagen?: string;
  
  /** Indica si el producto está disponible */
  @Input() disponible: boolean = true;
}
