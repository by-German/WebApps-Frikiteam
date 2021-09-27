import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(private router: Router, private storage: TokenStorageService) { }

  ngOnInit(): void {
  }

  navigateToEvents(): void {
    this.router.navigate(['/events'])
      .then(() => console.log('Navigated to events'));
  }

  navigateToLogin(): void {
    this.router.navigate(['/login'])
      .then(() => console.log('Navigated to login'));
  }

  navigateToCreate(): void {
    this.router.navigate(['/create'])
      .then(() => console.log('Navigated to create'));
  }
  navigateToUserProfile(): void {
    this.router.navigate(['/user-profile'])
      .then(() => console.log('Navigated to user profile'));
  }

  logout() {
    this.storage.signOut();
    this.navigateToLogin();
  }

  navigateToFavorites() {
    this.router.navigate(["/favorites"]).then();
  }

  navigateToRegister() {
    this.router.navigate(['/register']).then();
  }

  isLogged(): boolean {
    return !!this.storage.getAuthUser();
  }

  navigateToProfile() {
    this.router.navigate(['/organizer-profile']).then();
  }
}
