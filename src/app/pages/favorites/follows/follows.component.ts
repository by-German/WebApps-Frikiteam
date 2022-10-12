import { Component, OnInit } from '@angular/core';
import {CustomersApiService} from "../../../services/User/customers-api.service";
import {OrganizersApiService} from "../../../services/User/organizers-api.service";
import {OrganizerEventApiService} from "../../../services/event/organizer-event-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {FollowEventsService} from "../../../services/Social/follow-events.service";

@Component({
  selector: 'app-follows',
  templateUrl: './follows.component.html',
  styleUrls: ['./follows.component.css']
})
export class FollowsComponent implements OnInit {
  user : any
  events : any
  organizerId : number | undefined

  constructor(private followEvents: FollowEventsService,
              private organizerEventsApi : OrganizerEventApiService,
              private router: Router,
              private route: ActivatedRoute,
              private storage: TokenStorageService) { }

  ngOnInit(): void {
    this.user = this.storage.getAuthUser()
    this.organizerId = this.route.snapshot.params.id

    if (this.organizerId == undefined) {
      this.geEventsFollowed()
    }
    else {
      this.getEventsOrganizer(this.organizerId)
    }
  }

  getEventsOrganizer(id : number) {
    this.organizerEventsApi.getEventsByOrganizerId(id)
      .subscribe((result : any) => {
        this.events = result.content
      })
  }

  geEventsFollowed() {
    this.followEvents.getEventsFollowedByCustomer(this.user.id)
      .subscribe((result: any) => {
        this.events = result.content
      })
  }

  selectEvent(id : number) {
    this.router.navigate([`events/${id}`])
  }

}
