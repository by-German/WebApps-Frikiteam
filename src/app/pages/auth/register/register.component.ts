import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {CustomersApiService} from "../../../services/User/customers-api.service";
import {OrganizersApiService} from "../../../services/User/organizers-api.service";
import {colors} from "@angular/cli/utilities/color";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    dateBirth: new FormControl('', [Validators.required]),
  });

  organizer = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    password: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('' )
  });

  constructor( private router: Router,
               private storage: TokenStorageService,
               private auth: AuthService,
               private customerApi: CustomersApiService,
               private organizerApi: OrganizersApiService ) { }

  ngOnInit() {
  }

  userRegister(): void {
    this.user.value.logo = "default"
    console.log(this.user.value);

    this.customerApi.addCustomer(this.user.value)
      .subscribe( result => {
        if (result) {
          this.auth.login(this.user.value).subscribe(result => {
            this.storage.saveUserAuth(result)
            this.router.navigate(['/']).then()
          })
        }
      });
  }

  organizerRegister(): void {
    this.organizer.value.logo = "default"
    this.organizer.value.verified = false

    this.organizerApi.addOrganizer(this.organizer.value)
      .subscribe( result => {
        if (result) {
          this.auth.login(this.organizer.value).subscribe(result => {
            this.storage.saveUserAuth(result)
            this.router.navigate(['/']).then()
          })
        }
      });
  }
}
