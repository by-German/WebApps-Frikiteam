import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Organizer} from "../../models/organizer";
import {BASE_PATH} from "../common/http.common";

@Injectable({
  providedIn: 'root'
})
export class EventsInformationApiService {
  // api/events/1/information
  constructor(private http: HttpClient) { }

  getEventInformation(eventId : number) : Observable<any[]>{
    return this.http.get<any[]>(`${BASE_PATH}/events/${eventId}/information`)
  }

  postEventInformation(eventId: number, item :any) {
    return this.http.post(`${BASE_PATH}/events/${eventId}/information`, item)
  }
}
