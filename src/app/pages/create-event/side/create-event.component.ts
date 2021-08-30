import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }

  renderGeneralInformation(): void {
    this.router.navigate(['/create-event/general-information']);
  }

  renderDetailedInformation(): void {
    this.router.navigate(['/create-event/detailed-information']);
  }

  renderOptionalInformation(): void {
    this.router.navigate(['/create-event/optional-information']);

  }

}
