import { Component, OnInit } from '@angular/core';
import {Organizer} from "../../../models/organizer";
import {OrganizersApiService} from "../../../services/User/organizers-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsApiService} from "../../../services/event/events-api.service";
import {subscribeToResult} from "rxjs/internal-compatibility";
import {EventsInformationApiService} from "../../../services/event/events-information-api.service";
import {EventItinerariesApiService} from "../../../services/event/event-itineraries-api.service";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  organizer : Organizer;
  event : any;
  eventId : any;
  itineraries : any
  constructor(private organizersApi : OrganizersApiService,
              private itinerariesApi : EventItinerariesApiService,
              private router: Router,
              private route: ActivatedRoute,
              private eventsApi: EventsApiService) {

    this.organizer = {} as Organizer
    this.eventId = this.route.snapshot.params.id
  }

  ngOnInit(): void {
    this.eventsApi.getEventById(this.eventId).subscribe((result: any) => {
      // event
      this.event = result;

      // organizer
      this.organizersApi.getOrganizerById(result.organizerId)
        .subscribe( ( result => {
          this.organizer = result;
          console.log(result)
        }));
    })

    this.itinerariesApi.getAllByEventId(this.eventId)
      .subscribe(result => this.itineraries = result)

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
