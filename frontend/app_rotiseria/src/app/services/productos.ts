import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Productos {
  private http = inject(HttpClient);
  url = 'http://localhost:5000';
  
  /**
   * Obtiene todos los productos
   */
  getProductos(): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.url + '/productos', { headers });
  }

  /**
   * Obtiene un producto específico por ID
   */
  getProducto(id: number): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.url + '/producto/' + id, { headers });
  }

  /**
   * Crea un nuevo producto
   */
  createProducto(data: any): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.post(this.url + '/productos', data, { headers });
  }

  /**
   * Actualiza un producto por ID
   */
  updateProducto(id: number, data: any): Observable<any> {
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.put(this.url + '/producto/' + id, data, { headers });
  }

  /**
   * Elimina un producto por ID (requiere rol admin)
   */
  deleteProducto(id: number): Observable<any> {
    console.log('🔧 SERVICE: deleteProducto llamado con ID:', id);
    const token = localStorage.getItem('token');
    console.log('🔧 SERVICE: Token existe?', !!token);
    console.log('🔧 SERVICE: Token (primeros 20 chars):', token?.substring(0, 20));
    
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + token
    });
    
    const url = this.url + '/producto/' + id;
    console.log('🔧 SERVICE: URL completa:', url);
    console.log('🔧 SERVICE: Headers:', headers.keys());
    
    return this.http.delete(url, { headers });
  }
}
