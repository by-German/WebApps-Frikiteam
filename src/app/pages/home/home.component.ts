import { Component, OnInit } from '@angular/core';
import { EventsApiService } from "../../services/event/events-api.service";
import { MatTableDataSource} from "@angular/material/table";
import { Model } from "../../models/event";
import { Router } from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {


  events: Model.Event[] = [];
  dataSource = new MatTableDataSource(this.events);
  isSearching = false;
  arr = [];


  constructor(private eventsApi: EventsApiService, private router: Router) {
    //this.eventData = {} as event;
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(): void {

    this.eventsApi.getAllEvents().subscribe((response: Model.Event[]) => {
      console.log(response);

      this.events = response;
    });

  }


  applySearch(event: Event): void {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
    this.isSearching = !!searchValue;
  }



  navigateToEvent(id: number): void {
    this.router.navigate([`/events/${id}`])
      .then(() => console.log('Navigated to event with id' + id));
  }


}
