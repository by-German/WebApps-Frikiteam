import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "../../../models/customer";
import {CustomersApiService} from "../../../services/User/customers-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  @ViewChild('userProfileForm', { static : false}) userProfileForm !: NgForm;
  isEditMode = false;
  userId!: number;
  dataSource = new MatTableDataSource();
  userData: Customer = {} as Customer;
  defaultUser: Customer = {
    id: 0,
    user_name: '',
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    date_bird: '',
    profile_img: '',
  }
  constructor(private customersApi: CustomersApiService,
              private router: Router,
              private route: ActivatedRoute,
              private storage: TokenStorageService) { }

  ngOnInit(): void {
    // this.userId = Number(this.route.params.subscribe( params => {
    //   if (params.id) {
    //     const id = params.id;
    //     console.log(id);
    //     this.retrieveUser(id);
    //     this.isEditMode = true;
    //     return id;
    //   } else {
    //     this.resetUser();
    //     this.isEditMode = false;
    //     return 0;
    //   }
    // }));

    let user = this.storage.getAuthUser();
    this.customersApi.getCustomerById(user.id).subscribe(result => {
      console.log(result)
      this.userData = result;
    });
  }

  retrieveUser(id: number): void {
    this.customersApi.getCustomerById(id)
      .subscribe(response => {
        this.userData = response;
      });
  }
  refreshUser(){
    this.retrieveUser(this.userId);
  }
  resetUser(): void {
    this.userData = this.defaultUser;
  }
  cancelEdit(): void {
  }

  updateUser(): void {
    this.customersApi.updateCustomer(this.userData.id, this.userData as Customer)
      .subscribe(response => {
        console.log(response);
      });
  }

}
