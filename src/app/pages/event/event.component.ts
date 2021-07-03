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
  informations : any[];

  constructor(private organizersApi : OrganizersApiService,
              private router: Router,
              private route: ActivatedRoute,
              private eventsApi: EventsApiService,
              private informationApi: EventsInformationApiService) {
    this.organizer = {} as Organizer
    this.informations = []
  }

  ngOnInit(): void {
    let eventId = this.route.snapshot.params.id
    this.eventsApi.getEventById(eventId).subscribe((result: any) => {
      this.event = result;
      this.organizersApi.getOrganizerById(result.organizerId)
        .subscribe( ( result => {
          this.organizer = result;
          console.log(result)
        }));
      this.informationApi.getEventInformation(result.id)
        .subscribe(result => {
          console.log(result)
          this.informations = result;
        });
    })

  }

}
