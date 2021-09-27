import { Injectable } from '@angular/core';

const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {

  constructor() { }
  public signOut(): void {
    window.sessionStorage.clear();
  }
  public saveUserAuth(authUser: any): void {
    // window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(authUser));
  }
  public getAuthUser() {
    let userAuth = sessionStorage.getItem(USER_KEY)
    return JSON.parse(<string>userAuth)
  } // = () => JSON.parse(<string>window.sessionStorage.getItem(USER_KEY));
}
