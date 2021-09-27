import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)])
  })

  constructor(private router: Router, private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }

    console.log(this.form.value)
    this.authService.login(this.form.value).subscribe( result => {
      this.tokenStorageService.saveUserAuth(result); // this return authUser
      return this.router.navigate(['/']).then(() => window.location.reload())})
  }

  navigateToRegister() {
    this.router.navigate(['register'])
  }
}
