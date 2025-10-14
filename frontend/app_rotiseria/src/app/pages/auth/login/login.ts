import { Component } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { Header } from '../../../components/shared/header/header';
import { Auth } from '../../../services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [RouterLink,Header,ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {

  loginForm: FormGroup;

  constructor(
    private authservice: Auth,
    private router: Router,
    private formBuilder: FormBuilder
  ) { 
    this.loginForm = this.formBuilder.group({
      email: ['',Validators.required],
      password: ['',Validators.required]
    });
  }

  login() {
    this.authservice.login(this.loginForm.value).subscribe({
      next: (response: LoginResponse) => {
        alert('Login exitoso, ver consola');
        console.log('Login exitoso:', response);
        localStorage.setItem('token', response.access_token);
        localStorage.setItem('email', response.email);
        this.router.navigateByUrl(`/cliente/cliente-home`);///aca deberia ser dependiendo el rol
      },
      error: (error) => {
        alert('Error en el login, ver consola');
        console.error('Error en el login:', error);
        localStorage.removeItem('token');
        localStorage.removeItem('email');
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('email');
}
submit() {
  if (this.loginForm.valid) {
   this.login();
  }
  else {
    alert('Formulario inválido. Por favor, complete todos los campos.');
  }

}
}
