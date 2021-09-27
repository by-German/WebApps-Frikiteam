// auth.service.ts
// Authentication Service

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BASE_PATH } from "./common/http.common";

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
    return this.http.post(BASE_PATH + '/auth/sign-in', JSON.stringify({
      username: credentials.email,
      password: credentials.password
    }), httpOptions);
  }
  // register(user: any): Observable<any> {
  //   return this.http.post(BASE_PATH + '/auth/sign-up', JSON.stringify({
  //     username: user.username,
  //     email: user.email,
  //     password: user.password
  //   }), httpOptions);
  // }
}
