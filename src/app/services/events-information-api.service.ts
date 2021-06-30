import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Organizer} from "../models/organizer";
import {BASE_PATH} from "./common/http.common";

@Injectable({
  providedIn: 'root'
})
export class EventsInformationApiService {
  // api/events/1/information
  constructor(private http: HttpClient) { }

  getEventInformationById(id : number) : Observable<Organizer[]>{
    return this.http.get<Organizer[]>(`${BASE_PATH}/events/${id}/information`)
  }

}
