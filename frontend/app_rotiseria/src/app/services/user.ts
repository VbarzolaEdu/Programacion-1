import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class User {

  private http = inject(HttpClient);
  url = 'http://localhost:5000';
  
  /**
   * Obtiene todos los usuarios (requiere rol admin)
   * @param params - Parámetros de filtrado (nombre, apellidos, email, rol, page, limit)
   */
  getUsuarios(params?: { nombre?: string; apellidos?: string; email?: string; rol?: string; page?: number; limit?: number }): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    
    // Construir query params
    let queryParams = '';
    if (params) {
      const queryArray: string[] = [];
      if (params.nombre) queryArray.push(`nombre=${encodeURIComponent(params.nombre)}`);
      if (params.apellidos) queryArray.push(`apellidos=${encodeURIComponent(params.apellidos)}`);
      if (params.email) queryArray.push(`email=${encodeURIComponent(params.email)}`);
      if (params.rol) queryArray.push(`rol=${encodeURIComponent(params.rol)}`);
      if (params.page) queryArray.push(`page=${params.page}`);
      if (params.limit) queryArray.push(`limit=${params.limit}`);
      
      if (queryArray.length > 0) {
        queryParams = '?' + queryArray.join('&');
      }
    }
    
    return this.http.get(this.url + '/users' + queryParams, { headers });
  }

  /**
   * Obtiene un usuario específico por ID
   */
  getUsuario(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.url + '/user/' + id, { headers });
  }

  /**
   * Elimina un usuario por ID (requiere rol admin o ser el mismo usuario)
   */
  deleteUsuario(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(this.url + '/user/' + id, { headers });
  }

  /**
   * Actualiza un usuario por ID
   */
  updateUsuario(id: number, data: any): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put(this.url + '/user/' + id, data, { headers });
  }
}
