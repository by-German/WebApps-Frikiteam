// auth.service.ts
// Authentication Service

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const AUTH_API = 'http://localhost:8080/api/auth/';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  login(credentials: any): Observable<any> {
    return this.http.post(AUTH_API + 'sign-in', JSON.stringify({
      username: credentials.email,
      password: credentials.password
    }), httpOptions);
  }
  register(user: any): Observable<any> {
    return this.http.post(AUTH_API + 'sign-up', JSON.stringify({
      username: user.username,
      email: user.email,
      password: user.password
    }), httpOptions);
  }
}
