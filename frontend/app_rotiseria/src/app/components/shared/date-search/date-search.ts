import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-date-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './date-search.html',
  styleUrl: './date-search.css'
})
export class DateSearch {
  @Input() ocultarFiltro: boolean = false; // Para ocultar el filtro en ciertas condiciones
  @Output() fechaSeleccionada = new EventEmitter<string>();
  
  fechaFiltro: string = '';

  /**
   * Emite el evento de filtrado con la fecha seleccionada
   */
  filtrarPorFecha(): void {
    this.fechaSeleccionada.emit(this.fechaFiltro);
  }

  /**
   * Limpia el filtro de fecha
   */
  limpiarFiltro(): void {
    this.fechaFiltro = '';
    this.fechaSeleccionada.emit('');
  }

  /**
   * Convierte fecha ISO a formato yyyy-MM-dd para input date
   */
  convertirFechaParaInput(fecha: string): string {
    if (!fecha) return '';
    try {
      const date = new Date(fecha);
      const year = date.getFullYear();
      const month = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return `${year}-${month}-${day}`;
    } catch (error) {
      return '';
    }
  }
}