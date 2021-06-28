import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from "@angular/forms";
import {Customer} from "../../models/customer";
import {Organizer} from "../../models/organizer";
import {EventsApiService} from "../../services/events-api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signup-organizer',
  templateUrl: './signup-organizer.component.html',
  styleUrls: ['./signup-organizer.component.css']
})
export class SignupOrganizerComponent {

  constructor(private eventsApi: EventsApiService, private router: Router) { }

  hidePassword = true;
  email = new FormControl('', [Validators.required, Validators.email]);

  firstNameModel: any;
  idModel: any;
  mailModel: any;
  passwordModel: any;

  organizer = {} as Organizer;

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'Debes ingresar un usuario';
    }
    return this.email.hasError('email') ? 'Usuario no valido' : '';
  }

  signup(): void{
    if (this.mailModel != undefined && this.passwordModel!= undefined && this.firstNameModel != undefined
      && this.idModel!= undefined) {
      this.organizer.id = this.idModel;
      this.organizer.email = this.mailModel;
      this.organizer.firstName = this.firstNameModel;
      this.organizer.lastName = this.firstNameModel;
      this.organizer.password = this.passwordModel;

      this.eventsApi.addOrganizer(this.organizer).subscribe((response: any) => {});
      this.router.navigate(['login']);
    }
  }

}
