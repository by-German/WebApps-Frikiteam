import { Component, OnInit } from '@angular/core';
import {Organizer} from "../../../models/organizer";
import {OrganizersApiService} from "../../../services/User/organizers-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsApiService} from "../../../services/event/events-api.service";
import {EventItinerariesApiService} from "../../../services/event/event-itineraries-api.service";
import {FollowEventsService} from "../../../services/Social/follow-events.service";
import {FollowOrganizersService} from "../../../services/Social/follow-organizers.service";
import {TokenStorageService} from "../../../services/token-storage.service";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  organizer : Organizer;
  user : any
  event : any;
  eventId : any;
  itineraries : any
  followingEvent : Boolean = false
  followingOrganizer: Boolean = false

  constructor(private organizersApi : OrganizersApiService,
              private itinerariesApi : EventItinerariesApiService,
              private followEvents : FollowEventsService,
              private followOrganizers : FollowOrganizersService,
              private storage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private eventsApi: EventsApiService) {

    this.organizer = {} as Organizer
    this.eventId = this.route.snapshot.params.id
  }

  ngOnInit(): void {
    this.user = this.storage.getAuthUser()

    this.eventsApi.getEventById(this.eventId).subscribe((result: any) => {
      // event
      this.event = result;
      this.isFollowingEvent()

      // organizer
      this.organizersApi.getOrganizerById(result.organizerId)
        .subscribe( ( result => {
          this.organizer = result;
          this.isFollowingOrganizer()
        }));
    })

    this.itinerariesApi.getAllByEventId(this.eventId)
      .subscribe(result => this.itineraries = result)

  }

  followEvent(id: number) {
    this.followEvents.assignCustomerEventToFollow(this.user.id, id)
      .subscribe(result => this.followingEvent = true)
  }

  notFollowEvent(id: number) {
    this.followEvents.unassignCustomerEventToFollow(this.user.id, id)
      .subscribe(result => this.followingEvent = false)
  }

  isFollowingEvent() {
    this.followEvents.getEventsFollowedByCustomer(this.user.id)
      .subscribe((result:any) => {
        for (let i = 0; i < result.content.length; i++) {
          if (result.content[i].id == this.event.id) {
            this.followingEvent = true
            return
          }
        }
      })
  }

  followOrganizer(id: number) {
    this.followOrganizers.assignCustomerOrganizerToFollow(this.user.id, id)
      .subscribe(result => this.followingOrganizer = true)
  }
  notFollowOrganizer(id: number) {
    this.followOrganizers.unassignCustomerOrganizerToFollow(this.user.id, id)
      .subscribe(result => this.followingOrganizer = false)
  }
  isFollowingOrganizer() {
    this.followOrganizers.getOrganizersFollowedByCustomer(this.user.id)
      .subscribe((result:any) => {
        for (let i = 0; i < result.content.length; i++) {
          if (result.content[i].id == this.organizer.id) {
            this.followingOrganizer = true
            return
          }
        }
      })
  }

  renderLocation(id: number): void {
    this.router.navigate(['/events/'+id+'/location'])
      .then(() => console.log('Navigate to event location with id' + id));
  }

  renderInformation(id: number): void {
    this.router.navigate(['/events/'+id+'/information'] )
      .then(() => console.log('render event information with id' + id));
  }
}
