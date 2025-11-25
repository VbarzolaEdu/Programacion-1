import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-estado-filter',
  imports: [CommonModule],
  templateUrl: './estado-filter.html',
  styleUrl: './estado-filter.css'
})
export class EstadoFilter {
  @Input() ocultarFiltro: boolean = false;
  @Output() estadoSeleccionado = new EventEmitter<string>();
  
  estadoActivo: string = 'todos';

  /**
   * Filtra por estado del pedido
   */
  filtrarPorEstado(estado: string): void {
    this.estadoActivo = estado;
    this.estadoSeleccionado.emit(estado);
  }
}
