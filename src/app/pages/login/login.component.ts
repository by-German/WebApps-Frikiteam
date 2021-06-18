import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Organizer} from "../../models/organizer";
import {Customer} from "../../models/customer";
import {Router} from "@angular/router";
import {EventsApiService} from "../../services/events-api.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  correo!: number;
  clave: any;

  organizer = {} as Organizer;
  customer = {} as Customer;

  constructor(private eventsApi: EventsApiService, private router: Router) {
  }

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un usuario';
    }
    return this.email.hasError('email') ? 'Usuario no valido' : '';
  }

  login() {
    //inside home or not
    if(this.getBool()){
      this.router.navigate(['']);
    }
  }

  getBool(): boolean {
    if (this.correo != undefined && this.clave != undefined) {
      this.eventsApi.getOrganizerById(this.correo).subscribe((response: any) => {
        this.organizer = response;
      });

      this.eventsApi.getCustomerById(this.correo).subscribe((response: any) => {
        this.customer = response;
      });
    }

    if(this.clave === this.organizer.password || this.clave === this.customer.password){
      return true;
    }
    else
      return false;
  }
}
