import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Valoraciones {
  private http = inject(HttpClient);
  url = 'http://localhost:5000';
  
  /**
   * Obtiene todas las valoraciones con paginación
   */
  getValoraciones(params?: { page?: number; per_page?: number }): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    
    // Construir query string
    let queryString = '';
    if (params) {
      const queryParams = [];
      if (params.page) queryParams.push(`page=${params.page}`);
      if (params.per_page) queryParams.push(`per_page=${params.per_page}`);
      if (queryParams.length > 0) {
        queryString = '?' + queryParams.join('&');
      }
    }
    
    return this.http.get(this.url + '/valoraciones' + queryString, { headers });
  }

  /**
   * Obtiene una valoración específica por ID
   */
  getValoracion(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.url + '/valoracion/' + id, { headers });
  }

  /**
   * Crea una nueva valoración
   */
  createValoracion(data: any): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.url + '/valoraciones', data, { headers });
  }
}
