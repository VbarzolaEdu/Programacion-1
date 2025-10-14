import { Component, Input } from '@angular/core';

/**
 * Componente de encabezado reutilizable para páginas
 * Muestra un recuadro con un título centrado
 */
@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {
  /**
   * Título que se mostrará en el header
   * Ejemplo: "Productos", "Pedidos", "Usuarios"
   */
  @Input() titulo: string = '';
}
