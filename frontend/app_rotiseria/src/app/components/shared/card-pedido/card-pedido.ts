import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card-pedido',
  imports: [CommonModule],
  templateUrl: './card-pedido.html',
  styleUrl: './card-pedido.css'
})
export class CardPedido {
  @Input() id!: number;
  @Input() fecha!: string;
  @Input() total!: number;
  @Input() estado!: string;

  // Opcionales según la página
  @Input() cliente?: string;
  @Input() nombreProducto?: string;
  @Input() imagen?: string;
  @Input() comentario?: string;
  @Input() productos?: any[]; // Array de productos del pedido

  mostrarProductos: boolean = false;

  getEstadoClass(): string {
    // Siempre devolver color neutral (gris oscuro)
    return 'text-secondary';
  }

  toggleProductos(): void {
    this.mostrarProductos = !this.mostrarProductos;
  }

  contarProductos(): number {
    return this.productos?.length || 0;
  }
}