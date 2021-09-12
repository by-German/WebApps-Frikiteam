import { Injectable } from '@angular/core';
import {BASE_PATH} from "../common/http.common";
import {HttpClient} from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EventItinerariesApiService {

  constructor(private http: HttpClient) { }

  postByEventId(eventId: number, item: any) {
    return this.http.post(`${BASE_PATH}/events/${eventId}/itineraries`, item)
  }

  getAllByEventId(eventId: number) {
    return this.http.get(`${BASE_PATH}/events/${eventId}/itineraries`)
  }
}
