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
   */
  getUsuarios(): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.url + '/users', { headers });
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
