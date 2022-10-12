import { Component, OnInit } from '@angular/core';
import { EventsApiService } from "../../services/event/events-api.service";
import { MatTableDataSource} from "@angular/material/table";
import { Model } from "../../models/event";
import { Router } from "@angular/router";
import { retryWhen, delayWhen } from 'rxjs/operators'
import { timer } from 'rxjs'


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
  isConnected : Boolean = false;

  constructor(private eventsApi: EventsApiService, private router: Router) {
    //this.eventData = {} as event;
  }

  ngOnInit(): void {
    this.getAllEvents();
  }

  getAllEvents(): void {
    // check if we are connected to the server : server down, trying to connect  
    this.eventsApi.getAllEvents().pipe(
      retryWhen(errors => errors.pipe(
        delayWhen(val => {
          this.isConnected = false;
          return timer(val * 1000);
        })
      ))
    ).subscribe((response : any) => {
      this.isConnected = true;

      this.events = response;
      this.events = this.events.map(event => {
        let date = new Date(event.startDate)
        event.startDate = date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear();
        return event;
      })
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
        this.events = result;
      }
    )
  }

  navigateToEvent(id: number): void {
    this.router.navigate([`/events/${id}`])
      .then(() => {});
  }


}
