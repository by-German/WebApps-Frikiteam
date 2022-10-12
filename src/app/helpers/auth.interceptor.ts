import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS, HttpErrorResponse
} from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";

import { TokenStorageService } from 'src/app/services/token-storage.service';

// auth.interceptor.ts
// Inspection and Transformation Method
// to add Token if available

const TOKEN_HEADER_KEY = 'Authorization';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let authRequest = request;
    const authUser = this.tokenStorageService.getAuthUser();
    if (authUser != null) {
      authRequest = request.clone({
        headers: request.headers.set(TOKEN_HEADER_KEY, `Bearer ${authUser.token}`)});
    }
    
    return next.handle(authRequest);

    // handle error connection

    // return next.handle(authRequest).pipe(
    //   catchError( (e : HttpErrorResponse) => {
    // 
    //     return throwError(e.message)
    //   })
    // );
  }
}
export const authInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
];
