import {Component, OnInit, ViewChild} from '@angular/core';
import {NgForm} from "@angular/forms";
import {MatTableDataSource} from "@angular/material/table";
import {Customer} from "../../../models/customer";
import {CustomersApiService} from "../../../services/User/customers-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {OrganizersApiService} from "../../../services/User/organizers-api.service";
import {OrganizerEventApiService} from "../../../services/event/organizer-event-api.service";
import {PaymentService} from "../../../services/Payment/payment.service";

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  user : any
  events : any

  constructor(private customersApi: CustomersApiService,
              private organizerApi: OrganizersApiService,
              private organizerEventsApi : OrganizerEventApiService,
              private router: Router,
              private route: ActivatedRoute,
              private storage: TokenStorageService,
              private payment: PaymentService) { }

  ngOnInit(): void {
    this.user = this.storage.getAuthUser()
    if (this.user.role == "organizer")
      this.getEventsOrganizer(this.user.id)
    else
      this.getEventsCustomer(this.user.id)
  }

  getEventsOrganizer(id : number) {
    this.organizerEventsApi.getEventsByOrganizerId(id)
      .subscribe((result : any) => {
        this.events = result.content
      })
  }

  deleteEvent(id : number) {
    let organizerId = this.user.id
    this.organizerEventsApi.deleteEvent(organizerId, id)
      .subscribe((result : any) => {
        this.getEventsOrganizer(organizerId)
      })
  }

  updateEvent(id : number) {
    this.router.navigate([`create-event/general-information`], { queryParams: {id: id, mode_edit: true}}).then()
  }

  getEventsCustomer(id: number) {
    this.payment.getAllTicketsByCustomerId(id).subscribe((result: any) => {
      this.events = result
      console.log(this.events)
    })
  }

  sold(event: any) : number {
    return (event.sold / event.quantity)  * 100;
  }

}
