import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {TokenStorageService} from "../../services/token-storage.service";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  user : any

  constructor(private router: Router, private storage: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.storage.getAuthUser()
  }

  navigateToEvents(): void {
    this.router.navigate(['/events'])
      .then(() => {});
  }

  navigateToLogin(): void {
    this.router.navigate(['/login'])
      .then(() => {});
  }

  navigateToCreate(): void {
    this.router.navigate(['/create-event/general-information'])
      .then(() => {});
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
    this.router.navigate([`user-profile/${this.user.id}`]).then();
  }
}
