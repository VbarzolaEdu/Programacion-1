import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-search',
  imports: [FormsModule, CommonModule],
  templateUrl: './search.html',
  styleUrl: './search.css'
})
export class Search {
  
  /**
   * Placeholder personalizable para el input de búsqueda
   */
  @Input() placeholder: string = 'Buscar...';
  
  /**
   * Término de búsqueda (two-way binding con el padre)
   */
  @Input() terminoBusqueda: string = '';
  
  /**
   * Emite el término de búsqueda cuando cambia
   */
  @Output() terminoBusquedaChange = new EventEmitter<string>();

  /**
   * Emite un evento cada vez que el usuario busca
   */
  @Output() busquedaRealizada = new EventEmitter<string>();
  
  /**
   * Método que se ejecuta cuando cambia el input
   */
  onInputChange() {
    this.terminoBusquedaChange.emit(this.terminoBusqueda);
  }
  
  /**
   * Método que se ejecuta al hacer clic en el botón de búsqueda
   */
  buscar() {
    this.busquedaRealizada.emit(this.terminoBusqueda);
  }
}
