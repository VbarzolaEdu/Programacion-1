import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Header } from '../../../components/shared/header/header';
import { Auth } from '../../../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [RouterModule, Header, ReactiveFormsModule, CommonModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  registerForm: FormGroup;
  mensajeError: string = '';

  constructor(
    private authService: Auth,
    private router: Router,
    private formBuilder: FormBuilder
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(2)]],
      apellidos: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      cellphone: ['', [Validators.required, Validators.pattern(/^\d{9,15}$/)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', [Validators.required]]
    });
  }

  /**
   * Valida que las contraseñas coincidan
   */
  passwordsMatch(): boolean {
    const password = this.registerForm.get('password')?.value;
    const confirmPassword = this.registerForm.get('confirmPassword')?.value;
    return password === confirmPassword;
  }

  /**
   * Envía el formulario de registro
   */
  submit() {
    this.mensajeError = '';

    // Validar formulario
    if (this.registerForm.invalid) {
      alert('Por favor, complete todos los campos correctamente.');
      return;
    }

    // Validar que las contraseñas coincidan
    if (!this.passwordsMatch()) {
      this.mensajeError = 'Las contraseñas no coinciden';
      alert('Las contraseñas no coinciden');
      return;
    }

    // Preparar datos (sin confirmPassword)
    const { confirmPassword, ...registerData } = this.registerForm.value;

    // Llamar al servicio de registro
    this.authService.register(registerData).subscribe({
      next: (response) => {
        alert('¡Cuenta creada exitosamente! Por favor, inicia sesión.');
        this.router.navigate(['/auth/login']);
      },
      error: (error) => {
        // Verificar si es error 409 (email duplicado)
        if (error.status === 409) {
          this.mensajeError = 'El email ya está registrado';
          alert('El email ya está registrado. Por favor usa otro email.');
        } 
        // Error 400 (datos inválidos)
        else if (error.status === 400) {
          this.mensajeError = 'Los datos son inválidos';
          alert('Los datos son inválidos. Verifica el formulario.');
        } 
        // Otros errores
        else {
          this.mensajeError = 'Error al crear la cuenta. Intenta nuevamente.';
          alert('Error al crear la cuenta. Intenta nuevamente.');
        }
      }
    });
  }
}
