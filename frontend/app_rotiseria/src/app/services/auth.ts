import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http=inject(HttpClient);
  url='http://localhost:4200';
  login() : Observable<any> {
    let dataLogin={
    email: "f.berardo8@alumno.um.edu.ar",
    password:"123"
     }
    return this.http.post(this.url+'/auth/login',dataLogin);
  }

  
}