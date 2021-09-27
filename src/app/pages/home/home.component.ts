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
  value = ""


  constructor(private eventsApi: EventsApiService, private router: Router) {
    //this.eventData = {} as event;
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(): void {

    this.eventsApi.getAllEvents().subscribe((response: Model.Event[]) => {
      this.events = response;
    });

  }


  applySearch(event: Event): void {
    // @ts-ignore
    if (event.code == 'Enter' || event.code == 'NumpadEnter') {
      this.searchEvents(this.value)
    }
  }

  searchEvents(searchValue : String) {
    this.eventsApi.getSearchEvents(searchValue.trim().toLowerCase()).subscribe( (result:any) => {
        console.log(result)
        this.events = result;
      }
    )
  }

  navigateToEvent(id: number): void {
    this.router.navigate([`/events/${id}`])
      .then(() => console.log('Navigated to event with id' + id));
  }


}
