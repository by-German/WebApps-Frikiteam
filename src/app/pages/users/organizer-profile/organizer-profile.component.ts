import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Organizer} from "../../../models/organizer";
import {ActivatedRoute, Router} from "@angular/router";
import {OrganizersApiService} from "../../../services/User/organizers-api.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-organizer-profile',
  templateUrl: './organizer-profile.component.html',
  styleUrls: ['./organizer-profile.component.css']
})
export class OrganizerProfileComponent implements OnInit {
  @ViewChild('organizerProfileForm', { static : false}) organizerProfileForm !: NgForm;
  isEditMode = false;
  userId!: number;
  dataSource = new MatTableDataSource();
  userData: Organizer = {} as Organizer;
  defaultUser: Organizer = {
    id: 0,
    firstName: '',
    lastName: '',
    password: '',
    email: '',
    logo: '',
    description: '',
    verified: false,
    profile_img: '',
  }
  constructor(private organizersApi: OrganizersApiService,
              private router: Router,
              private route: ActivatedRoute,
              private storage: TokenStorageService) { }

  ngOnInit(): void {
    this.userId = Number(this.route.params.subscribe( params => {
      if (params.id) {
        const id = params.id;
        console.log(id);
        this.retrieveUser(id);
        this.isEditMode = true;
        return id;
      } else {
        this.resetUser();
        this.isEditMode = false;
        return 0;
      }
    }));

    let organizer = this.storage.getAuthUser();
    this.organizersApi.getOrganizerById(organizer.id).subscribe(result => {
      this.userData = result;
    })
  }

  retrieveUser(id: number): void {
    this.organizersApi.getOrganizerById(id)
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
    this.organizersApi.updateOrganizer(this.userData.id, this.userData as Organizer)
      .subscribe(response => {
        console.log(response);
      });
  }

}
