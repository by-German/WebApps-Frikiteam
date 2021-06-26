import { Component, OnInit } from '@angular/core';
import {CreateEventI} from "../../models/create-event";

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.css']
})
export class CreateEventComponent implements OnInit {
  public Create_Event: CreateEventI;

  constructor() {
    this.Create_Event = new CreateEventI('','','',10,'','','');
  }

  ngOnInit(): void {
  }

  onSubmit(): void{
    alert("Se ha creado el evento correctamente");
  }

}
