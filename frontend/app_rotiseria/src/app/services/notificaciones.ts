import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class NotificacionesService {
  private apiUrl = 'http://localhost:5000/notificacion';

  constructor(private http: HttpClient) { }

  // Obtener notificaciones
  getNotificaciones(params?: any): Observable<any> {
    return this.http.get(this.apiUrl, { params });
  }

  // Enviar notificación masiva
  enviarNotificacion(mensaje: string): Observable<any> {
    return this.http.post(this.apiUrl, { mensaje });
  }
}

