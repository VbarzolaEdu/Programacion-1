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

  getEstadoClass(): string {
    switch (this.estado.toLowerCase()) {
      case 'entregado':
        return 'text-success';
      case 'en preparación':
      case 'listo para entregar':
        return 'text-warning';
      case 'cancelado':
      case 'rechazado':
        return 'text-danger';
      default:
        return 'text-secondary';
    }
  }
}
