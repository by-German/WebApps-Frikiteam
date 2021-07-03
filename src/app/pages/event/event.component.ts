import { Component, OnInit } from '@angular/core';
import { Organizer } from "../../models/organizer";
import { OrganizersApiService } from "../../services/organizers-api.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  organizer : Organizer;

  constructor(private organizers : OrganizersApiService, private router: Router) {
    this.organizer = {} as Organizer
  }

  ngOnInit(): void {
    this.organizers.getOrganizerById(1)
      .subscribe( ( result => {
        this.organizer = result;
        console.log(result)
      }))
  }

  navigateToEventLocation(id: number): void {
    this.router.navigate(['/events/'+id+'/location'])
      .then(() => console.log('Navigate to event location with id' + id));
  }
  
}
