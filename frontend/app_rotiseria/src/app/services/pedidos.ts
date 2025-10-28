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
   * Obtiene todos los pedidos (requiere rol admin)
   */
  getPedidos(): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.url + '/pedidos', { headers });
  }

  /**
   * Obtiene un pedido específico por ID
   */
  getPedido(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.url + '/pedidos/' + id, { headers });
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


