import { Component, OnInit } from '@angular/core';
import {OrganizersApiService} from "../../../services/User/organizers-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {CustomersApiService} from "../../../services/User/customers-api.service";
import {CloudinaryApiService} from "../../../services/cloudinary-api.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  userId : number | undefined
  role : string | undefined
  user : any
  update : boolean = false
  file : any
  pathImg : string | undefined
  pathImgPreview : string | undefined
  loading : boolean = false;

  // @ts-ignore
  form : FormGroup

  constructor(private organizersApi : OrganizersApiService,
              private customerApi : CustomersApiService,
              private storage : TokenStorageService,
              private cloudinary : CloudinaryApiService,
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
      this.pathImg = result.logo
      this.pathImgPreview = result.logo
    })
  }
  
  loadOrganizerInformation() {
    this.organizersApi.getOrganizerById(this.user.id).subscribe(result => {
      this.user = result;
      this.pathImg = result.logo
      this.pathImgPreview = (result.logo != 'default') ? result.logo : ''; 
    })
  }

  showDialog() {
    this.update = true

    this.form = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required]),
      password: new FormControl(this.user.password, [Validators.required]),
    })
  }

  onChange() {
    // @ts-ignore
    let img = document.getElementById('input-img');
    // @ts-ignore
    this.file  = img.files[0]
    this.pathImgPreview = URL.createObjectURL(this.file);
  }

  onSubmit(): void {
    this.loading = true;

    if (this.pathImgPreview != this.user.logo) {
      let ref = this.cloudinary.reference(this.file.name)
      this.cloudinary.post(this.file).then(result => {
        ref.getDownloadURL().subscribe((url: any) => {
          this.form.value.logo = url
          if (this.role == "organizer") this.updateOrganizer(this.user.id, this.form.value)
          else this.updateCustomer(this.user.id, this.form.value)
          this.loading = false;
          location.reload();
        })
      })
    } else {
      this.form.value.logo = this.user.logo
      if (this.role == "organizer")
        this.updateOrganizer(this.user.id, this.form.value)
      else
        this.updateCustomer(this.user.id, this.form.value)
      location.reload();  
    }
  }

  updateOrganizer(id: number, organizer : any) {
    let user = this.updateUser(organizer)

    this.organizersApi.updateOrganizer(id, user).subscribe(result => {
      this.router.navigate([`user-profile/${id}`])
    })
  }

  updateCustomer(id: number, customer : any) {
    let user = this.updateUser(customer)

    this.customerApi.updateCustomer(id, user).subscribe(result => {
      this.router.navigate([`user-profile/${id}`])
    })
  }

  cancelDialog(): any {
    this.update = !this.update
    this.pathImgPreview = (this.pathImg && this.pathImg != 'default') ? this.pathImg : '';
  }

  updateUser(user: any) {
    this.user.firstName = user.firstName
    this.user.lastName = user.lastName
    this.user.email = user.email
    this.user.password = user.password
    this.user.logo = user.logo

    return this.user
  }
}
