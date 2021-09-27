// auth.interceptor.ts
// Inspection and Transformation Method
// to add Token if available

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';

import { Observable } from 'rxjs';
import { TokenStorageService } from 'src/app/services/token-storage.service';

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const authUser = this.tokenStorageService.getAuthUser();
    console.log("auth.interceptor")
    console.log(authUser)
    if (authUser != null) {
      authRequest = request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${authUser.token}`)});
    }
    return next.handle(authRequest);
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
