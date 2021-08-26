import { Component, OnInit } from '@angular/core';
import {Organizer} from "../../models/organizer";
import {OrganizersApiService} from "../../services/organizers-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsApiService} from "../../services/events-api.service";
import {subscribeToResult} from "rxjs/internal-compatibility";
import {EventsInformationApiService} from "../../services/events-information-api.service";


@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  organizer : Organizer;
  event : any;
  eventId : any;

  constructor(private organizersApi : OrganizersApiService,
              private router: Router,
              private route: ActivatedRoute,
              private eventsApi: EventsApiService) {

    this.organizer = {} as Organizer
    this.eventId = this.route.snapshot.params.id
  }

  ngOnInit(): void {
    this.eventsApi.getEventById(this.eventId).subscribe((result: any) => {
      this.event = result;
      this.organizersApi.getOrganizerById(result.organizerId)
        .subscribe( ( result => {
          this.organizer = result;
          console.log(result)
        }));
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
