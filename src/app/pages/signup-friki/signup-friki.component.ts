import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Customer} from "../../models/customer";
import {EventsApiService} from "../../services/events-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-friki',
  templateUrl: './signup-friki.component.html',
  styleUrls: ['./signup-friki.component.css']
})
export class SignupFrikiComponent{

  constructor(private eventsApi: EventsApiService, private router: Router) { }

  hidePassword = true;
  hideRepeatPassword = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  mailModel!: string;
  passwordModel: any;
  firstNameModel: any;
  lastNameModel: any;
  idModel: any;

  customer = {} as Customer;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un correo electronico';
    }
    return this.email.hasError('email') ? 'Usuario no valido' : '';
  }


  signup(): void{
    if (this.mailModel != undefined && this.passwordModel!= undefined && this.firstNameModel != undefined &&
    this.lastNameModel!= undefined && this.idModel!= undefined) {
      this.customer.id = this.idModel;
      this.customer.email = this.mailModel;
      this.customer.firstName = this.firstNameModel;
      this.customer.lastName = this.lastNameModel;
      this.customer.password = this.passwordModel;

      this.eventsApi.addCustomer(this.customer).subscribe((response: any) => {});
      this.router.navigate(['login']);
    }
  }
}
