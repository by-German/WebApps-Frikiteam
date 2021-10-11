import { Component, OnInit } from '@angular/core';
import {OrganizersApiService} from "../../../services/User/organizers-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {CustomersApiService} from "../../../services/User/customers-api.service";
import {CloudinaryApiService} from "../../../services/cloudinary-api.service";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId : number | undefined
  role : string | undefined
  user : any


  constructor(private organizersApi : OrganizersApiService,
              private customerApi : CustomersApiService,
              private storage : TokenStorageService,
              private drive : CloudinaryApiService,
              private router: Router,
              private route: ActivatedRoute,
              ) { }

  ngOnInit(): void {
    this.user = this.storage.getAuthUser()
    this.userId = this.user.id
    this.role = this.user.role

    if (this.role == "organizer") this.loadOrganizerInformation()
    else this.loadCustomerInformation()
  }

  loadCustomerInformation() {
    this.customerApi.getCustomerById(this.user.id).subscribe(result => {
      this.user = result
    })
  }

  loadOrganizerInformation() {
    this.organizersApi.getOrganizerById(this.user.id).subscribe(result => {
      this.user = result;
    })
  }
}
