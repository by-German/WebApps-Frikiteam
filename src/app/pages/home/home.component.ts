import { Component, OnInit } from '@angular/core';
import {EventsApiService} from "../../services/events-api.service";
import {MatTableDataSource} from "@angular/material/table";
import { Model } from "../../models/event";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events: Model.Event[] = [];
  dataSource = new MatTableDataSource();
  isSearching = false;

  constructor(private eventsApi: EventsApiService) {
    //this.eventData = {} as Event;
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


}
