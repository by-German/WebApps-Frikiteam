import { Component, OnInit } from '@angular/core';
import {Organizer} from "../../models/organizer";
import {OrganizersApiService} from "../../services/organizers-api.service";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  organizer : Organizer;

  constructor(private organizers : OrganizersApiService) {
    this.organizer = {} as Organizer
  }

  ngOnInit(): void {
    this.organizers.getOrganizerById(1)
      .subscribe( ( result => {
        this.organizer = result;
        console.log(result)
      }))
  }

}
