import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { NotificacionesService } from '../../../services/notificaciones';

@Component({
  selector: 'app-promociones',
  imports: [Navbar, Header, CommonModule, FormsModule],
  templateUrl: './promociones.html',
  styleUrl: './promociones.css'
})
export class Promociones {
  mensaje: string = '';
  enviando: boolean = false;
  mensajeExito: string = '';
  mensajeError: string = '';

  constructor(private notificacionesService: NotificacionesService) {}

  enviarNotificacion() {
    if (!this.mensaje.trim()) {
      this.mensajeError = 'El mensaje no puede estar vacío';
      return;
    }

    this.enviando = true;
    this.mensajeError = '';
    this.mensajeExito = '';

    this.notificacionesService.enviarNotificacion(this.mensaje).subscribe({
      next: (response) => {
        this.mensajeExito = `Notificación enviada exitosamente a ${response.total_usuarios} usuarios. Emails enviados: ${response.emails_enviados}`;
        this.mensaje = ''; // Limpiar el formulario
        this.enviando = false;
        
        // Ocultar mensaje después de 5 segundos
        setTimeout(() => {
          this.mensajeExito = '';
        }, 5000);
      },
      error: (error) => {
        this.mensajeError = 'Error al enviar la notificación: ' + (error.error?.error || 'Error desconocido');
        this.enviando = false;
      }
    });
  }

  limpiarMensajes() {
    this.mensajeExito = '';
    this.mensajeError = '';
  }
}
