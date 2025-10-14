import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardUsuario } from '../../../components/shared/usuario/card-usuario';
import { Navbar } from '../../../components/shared/navbar/navbar';
import { Header } from '../../../components/shared/header/header';
import { User } from '../../../services/user';
import { Auth } from '../../../services/auth';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule, Navbar, CardUsuario, Header],
  templateUrl: './perfil.html',
  styleUrls: ['./perfil.css']
})
export class Perfil {
  usuario: any = null;
  cargando: boolean = false;
  modoEdicion: boolean = false;
  
  // Datos temporales para edición
  usuarioTemporal: any = {};

  constructor(
    private UsuarioService: User,
    private authService: Auth
  ) {}

  ngOnInit() {
    this.cargarPerfil();
  }

  /**
   * Carga los datos del usuario actual desde el backend
   */
  cargarPerfil() {
    this.cargando = true;
    const userId = this.authService.getCurrentUserId();
    
    if (!userId) {
      alert('No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.');
      this.cargando = false;
      return;
    }

    this.UsuarioService.getUsuario(userId).subscribe({
      next: (response: any) => {
        console.log('Perfil cargado:', response);
        this.usuario = response;
        this.cargando = false;
      },
      error: (error) => {
        console.error('Error al cargar perfil:', error);
        this.cargando = false;
        alert('Error al cargar tu perfil. Verifica tu conexión.');
      }
    });
  }

  /**
   * Activa el modo de edición
   */
  activarEdicion() {
    this.modoEdicion = true;
    // Clonar los datos actuales para edición
    this.usuarioTemporal = {
      nombre: this.usuario.nombre,
      apellidos: this.usuario.apellidos,
      email: this.usuario.email,
      cellphone: this.usuario.cellphone
    };
  }

  /**
   * Cancela la edición y restaura los datos originales
   */
  cancelarEdicion() {
    this.modoEdicion = false;
    this.usuarioTemporal = {};
  }

  /**
   * Guarda los cambios del perfil
   */
  guardarCambios() {
    console.log('Guardando cambios:', this.usuarioTemporal);
    
    const confirmar = confirm('¿Guardar los cambios en tu perfil?');
    if (!confirmar) return;

    const userId = this.authService.getCurrentUserId();
    
    if (!userId) {
      alert('No se pudo obtener el ID del usuario. Por favor, inicia sesión nuevamente.');
      return;
    }
    
    this.UsuarioService.updateUsuario(userId, this.usuarioTemporal).subscribe({
      next: (response) => {
        console.log('Perfil actualizado:', response);
        alert('Perfil actualizado correctamente');
        
        // Actualizar los datos locales
        this.usuario.nombre = this.usuarioTemporal.nombre;
        this.usuario.apellidos = this.usuarioTemporal.apellidos;
        this.usuario.email = this.usuarioTemporal.email;
        this.usuario.cellphone = this.usuarioTemporal.cellphone;
        
        this.modoEdicion = false;
        this.usuarioTemporal = {};
      },
      error: (error) => {
        console.error('Error al actualizar perfil:', error);
        if (error.status === 400) {
          alert('Datos inválidos. Verifica la información ingresada.');
        } else if (error.status === 409) {
          alert('El email ya está en uso por otro usuario.');
        } else {
          alert('Error al actualizar el perfil. Intenta nuevamente.');
        }
      }
    });
  }
}
