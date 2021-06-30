import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../../services/auth.service";
import {TokenStorageService} from "../../services/token-storage.service";
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

  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private router: Router, private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {

  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
    this.authService.login(this.form.value).subscribe(
      data => {
        console.log(data);
        this.tokenStorageService.saveToken(data.token);
        this.tokenStorageService.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        return this.router.navigate(['/']).then(() => {
          console.log(this.router.url);
          window.location.reload();
        });
      },
      error => {
        console.log(error.error.errorMessage);
        this.errorMessage = error.error.errorMessage;
        this.isLoginFailed = true;
        this.isLoggedIn = false;
      }
    );
  }

}
