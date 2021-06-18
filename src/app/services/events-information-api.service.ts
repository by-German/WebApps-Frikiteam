import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Organizer} from "../models/organizer";

@Injectable({
  providedIn: 'root'
})
export class EventsInformationApiService {
  // api/events/1/information
  constructor(private http: HttpClient) { }

  getEventInformationById(id : number) : Observable<Organizer[]>{
    return this.http.get<Organizer[]>(`http://localhost:3000/api/events/${id}/information`)
  }

}
