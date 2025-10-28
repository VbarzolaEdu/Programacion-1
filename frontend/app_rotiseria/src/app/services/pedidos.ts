import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Pedidos {
   private http = inject(HttpClient);
  url = 'http://localhost:5000';
  
  /**
   * Obtiene todos los pedidos con filtros opcionales
   * @param params - Objeto con parámetros opcionales: id_user, estado, fecha, page, per_page
   */
  getPedidos(params?: any): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    
    // Construir query string con los parámetros
    let queryString = '';
    if (params) {
      const queryParams = new URLSearchParams();
      Object.keys(params).forEach(key => {
        if (params[key] !== null && params[key] !== undefined) {
          queryParams.append(key, params[key].toString());
        }
      });
      queryString = queryParams.toString() ? '?' + queryParams.toString() : '';
    }
    
    return this.http.get(this.url + '/pedidos' + queryString, { headers });
  }

  /**
   * Obtiene un pedido específico por ID
   */
  getPedido(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    console.log(`🔍 Obteniendo pedido ID: ${id} desde: ${this.url}/pedido/${id}`);
    return this.http.get(this.url + '/pedido/' + id, { headers });
  }

  /**
   * Elimina un pedido por ID (requiere rol admin o ser el mismo usuario)
   */
  deletePedido(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.delete(this.url + '/pedido/' + id, { headers });
  }

  /**
   * Actualiza un pedido por ID
   */
  updatePedido(id: number, data: any): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put(this.url + '/pedido/' + id, data, { headers });
  }

  /**
   * Crea un nuevo pedido
   */
  createPedido(data: any): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.url + '/pedidos', data, { headers });
  }
}


