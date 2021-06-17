import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-signup-organizer',
  templateUrl: './signup-organizer.component.html',
  styleUrls: ['./signup-organizer.component.css']
})
export class SignupOrganizerComponent {

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
