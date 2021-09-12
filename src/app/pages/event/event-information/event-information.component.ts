import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from "@angular/router";
import {EventsInformationApiService} from "../../../services/event/events-information-api.service";
import {EventsApiService} from "../../../services/event/events-api.service";

@Component({
  selector: 'app-event-information',
  templateUrl: './event-information.component.html',
  styleUrls: ['./event-information.component.css']
})
export class EventInformationComponent implements OnInit {
  informations: any[] = [];
  event : any;
  id : any;
  constructor(private router: Router,
              private route: ActivatedRoute,
              private informationApi: EventsInformationApiService,
              private eventsApi: EventsApiService) { }

  ngOnInit(): void {
    // @ts-ignore
    this.id = this.route.parent.snapshot.paramMap.get('id')

    this.eventsApi.getEventById(this.id).subscribe((result: any) => {
      this.event = result;
      this.informationApi.getEventInformation(result.id)
        .subscribe(result => {
          console.log(result)
          this.informations = result;
        });
    })
  }
}
