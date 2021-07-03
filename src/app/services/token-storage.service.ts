import { Injectable } from '@angular/core';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  public signOut(): void {
    window.sessionStorage.clear();
  }
  public saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }
  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }
  public assignRole(role: string): void {
    window.sessionStorage.setItem('role', role);
  }
  public getToken(): string {
    return <string>window.sessionStorage.getItem(TOKEN_KEY);
  }
  public getUser = () => JSON.parse(<string>window.sessionStorage.getItem(USER_KEY));
}
