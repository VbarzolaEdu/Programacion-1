import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Auth {

  private http=inject(HttpClient);
  url='http://localhost:5000';
  login(dataLogin:LoginRequest) : Observable<any> {
    
    // let dataLogin={
    // email: "h.berardo@alumno.um.edu.ar",
    // password:"123"
    //  }
    return this.http.post(this.url+'/auth/login',dataLogin);
  }

  
}

