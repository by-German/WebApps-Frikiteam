import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup-friki',
  templateUrl: './signup-friki.component.html',
  styleUrls: ['./signup-friki.component.css']
})
export class SignupFrikiComponent{

  constructor() { }

  hidePassword = true;
  hideRepeatPassword = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un correo electronico';
    }
    return this.email.hasError('email') ? 'Usuario no valido' : '';
  }

}
