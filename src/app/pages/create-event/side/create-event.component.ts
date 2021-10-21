import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  modeEdit : Boolean = false
  eventId : number | undefined

  constructor(private router: Router,private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.queryParams['id']
    this.modeEdit = this.route.snapshot.queryParams['mode_edit']
  }

  renderGeneralInformation(): void {
    if (this.modeEdit)
      this.router.navigate([`create-event/general-information`],
        { queryParams: {id: this.eventId, mode_edit: true}});
  }

  renderDetailedInformation(): void {
    if (this.modeEdit)
      this.router.navigate([`create-event/${this.eventId}/detailed-information`],
        { queryParams: {id: this.eventId, mode_edit: true}});
  }

  renderOptionalInformation(): void {
    if (this.modeEdit)
      this.router.navigate([`create-event/${this.eventId}/optional-information`],
        { queryParams: {id: this.eventId, mode_edit: true}});
  }

}
