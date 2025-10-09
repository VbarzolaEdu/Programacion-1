import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-card-producto',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './card-producto.html',
  styleUrls: ['./card-producto.css']
})
export class CardProducto {
  @Input() id!: number;
  @Input() nombre!: string;
  @Input() categoria?: string;
  @Input() precio!: number;
  @Input() imagen?: string;
  @Input() disponible?: boolean;

  @Output() productoEditado = new EventEmitter<any>();
  @Output() productoEliminado = new EventEmitter<any>();

  editMode = false;
  productoTemporal: any = {};

  habilitarEdicion() {
    this.editMode = true;
    this.productoTemporal = {
      id: this.id,
      nombre: this.nombre,
      categoria: this.categoria,
      precio: this.precio,
      disponible: this.disponible
    };
  }

  guardarCambios() {
    this.editMode = false;
    this.nombre = this.productoTemporal.nombre;
    this.categoria = this.productoTemporal.categoria;
    this.precio = this.productoTemporal.precio;
    this.disponible = this.productoTemporal.disponible;

    this.productoEditado.emit({
      id: this.id,
      nombre: this.nombre,
      categoria: this.categoria,
      precio: this.precio,
      disponible: this.disponible
    });
  }

  cancelarEdicion() {
    this.editMode = false;
  }

  eliminar() {
    this.productoEliminado.emit({
      id: this.id,
      nombre: this.nombre
    });
  }
}
