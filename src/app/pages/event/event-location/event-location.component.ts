import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-event-location',
  templateUrl: './event-location.component.html',
  styleUrls: ['./event-location.component.css']
})
export class EventLocationComponent implements OnInit {

  title = 'My first AGM project';
  lat = 51.678418;
  lng = 7.809007;
  zoom:number = 17;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  navigateToEvent(id: number): void {
    this.router.navigate(['/events/'+id])
      .then(() => console.log('Navigated to event with id' + id));
  }

}
