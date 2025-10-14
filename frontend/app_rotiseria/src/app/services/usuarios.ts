import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { Observable } from 'rxjs';
// import { LoginResponse } from '../interfaces/LoginRequest';

@Injectable({
  providedIn: 'root'
})
export class Usuarios {
    private http=inject(HttpClient);
  url='http://localhost:5000';
  login(dataLogin:LoginRequest) : Observable<any> {
    
    let headers = new HttpHeaders({
      'content-type': 'application/json',
      'Authorization': 'Bearer ' + localStorage.getItem('token')
    });
    return this.http.get(this.url+'/users', { headers });
}}
