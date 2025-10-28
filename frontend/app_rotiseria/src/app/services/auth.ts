import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http = inject(HttpClient);
  url = 'http://localhost:5000';
  
  login(dataLogin: LoginRequest): Observable<any> {
    return this.http.post(this.url + '/auth/login', dataLogin);
  }

  /**
   * Registra un nuevo usuario
   */
  register(dataRegister: RegisterRequest): Observable<any> {
    return this.http.post(this.url + '/auth/register', dataRegister);
  }

  /**
   * Decodifica el JWT token y obtiene el user_id
   */
  getCurrentUserId(): number | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      // Decodificar el JWT (payload está en la segunda parte)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const userId = payload.sub || payload.user_id || payload.id;
      // Convertir a número para asegurar tipo correcto
      return userId ? Number(userId) : null;
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }

  /**
   * Obtiene el rol del usuario actual desde el token
   */
  getUserRole(): string | null {
    const token = localStorage.getItem('token');
    if (!token) {
      return null;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload.rol || payload.role || null;
    } catch (error) {
      console.error('Error al decodificar token:', error);
      return null;
    }
  }

  /**
   * Verifica si el usuario está autenticado
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      const exp = payload.exp;
      
      // Verificar si el token ha expirado
      if (exp && Date.now() >= exp * 1000) {
        this.logout();
        return false;
      }
      
      return true;
    } catch (error) {
      return false;
    }
  }

  /**
   * Cierra la sesión del usuario
   */
  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}

interface LoginRequest {
  email: string;
  password: string;
}

interface RegisterRequest {
  nombre: string;
  apellidos: string;
  email: string;
  cellphone: string;
  password: string;
}
