import { Component, OnInit } from '@angular/core';
import {CreateEventI} from "../../models/create-event";
import {Router} from "@angular/router";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  public Create_Event: CreateEventI;

  constructor(private router: Router) {
    this.Create_Event = new CreateEventI('','','',10,'','','');
  }

  ngOnInit(): void {
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
