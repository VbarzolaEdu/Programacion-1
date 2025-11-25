import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './form.html',
  styleUrl: './form.css'
})
export class Form implements OnInit {
  @Input() titulo: string = 'Editar Perfil';
  @Input() datos: any = {};
  @Input() camposReadOnly: any = {}; // Campos que no se pueden editar
  @Input() mostrarCampos: string[] = ['nombre', 'apellidos', 'email', 'cellphone']; // Campos a mostrar
  @Input() estadoOpciones: string[] = ['En preparación', 'Listo', 'Rechazado']; // Opciones para el select de estado
  
  @Output() guardar = new EventEmitter<any>();
  @Output() cancelar = new EventEmitter<void>();

  datosTemporal: any = {};

  ngOnInit() {
    // Clonar los datos de entrada
    this.datosTemporal = { ...this.datos };
  }

  onGuardar() {
    this.guardar.emit(this.datosTemporal);
  }

  onCancelar() {
    this.cancelar.emit();
  }

  // Verificar si un campo debe mostrarse
  debeMostrar(campo: string): boolean {
    return this.mostrarCampos.includes(campo);
  }

  // Obtener label del campo
  getLabel(campo: string): string {
    const labels: any = {
      'nombre': 'Nombre',
      'apellidos': 'Apellidos',
      'email': 'Email',
      'cellphone': 'Teléfono',
      'rol': 'Rol',
      'estado': 'Estado',
      'precio': 'Precio',
      'categoria': 'Categoría',
      'precio_final': 'Precio Final',
      'fecha': 'Fecha del Pedido',
      'descripcion': 'Descripción'
    };
    return labels[campo] || campo;
  }

  // Obtener tipo de input
  getTipoInput(campo: string): string {
    if (campo === 'email') return 'email';
    if (campo === 'cellphone' || campo === 'precio' || campo === 'precio_final') return 'number';
    if (campo === 'fecha') return 'date';
    if (campo === 'estado') return 'select';
    if (campo === 'descripcion') return 'textarea';
    return 'text';
  }

  // Obtener placeholder
  getPlaceholder(campo: string): string {
    const placeholders: any = {
      'nombre': 'Nombre del producto',
      'precio': '0.00',
      'categoria': 'Ej: Hamburguesas, Pizzas, Bebidas, etc.',
      'descripcion': 'Descripción breve del producto (opcional)'
    };
    return placeholders[campo] || '';
  }

  // Obtener texto de ayuda
  getHelperText(campo: string): string {
    const helpers: any = {
      'precio_final': 'El precio total del pedido',
      'estado': 'Estado actual del pedido en el proceso',
      'fecha': 'Fecha en que se realizó el pedido'
    };
    return helpers[campo] || '';
  }
}
