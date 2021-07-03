import { Component, OnInit } from '@angular/core';
import { CreateEventI } from "../../models/create-event";
import { Router } from "@angular/router";
import { OrganizerEventApiService } from "../../services/organizer-event-api.service";
import { Model } from "../../models/event";
import { FormControl, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  public Create_Event: CreateEventI;

  constructor(private organizerEventApi: OrganizerEventApiService, private router: Router) {
    this.Create_Event = new CreateEventI('','','',10,'','','');
  }

  ngOnInit(): void {
  }

  create = new FormGroup({
    name: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    information: new FormControl('', [Validators.required])
  });

  registerEvent() : void {
    this.create.value.placeId = 1;
    console.log(this.create.value);

    this.organizerEventApi.createNewEvent(this.create.value, 1)
      .subscribe(result => {
        console.log(result);
      })
  }

  onSubmit(form: any): void{
    form.reset();
    alert("Se ha creado el evento correctamente");
  }

  navigateToEvents(): void {
    this.router.navigate(['/events'])
      .then(() => console.log('Navigated to events'));
  }





}
