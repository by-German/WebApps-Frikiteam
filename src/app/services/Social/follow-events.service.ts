import { Injectable } from '@angular/core';
import {BASE_PATH} from "../common/http.common";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FollowEventsService {

  constructor(private http: HttpClient) { }

  getEventsFollowedByCustomer(customerId: number) {
    return this.http.get(`${BASE_PATH}/customers/${customerId}/events`)
  }

  assignCustomerEventToFollow(customerId: number, eventId: number) {
    return this.http.post(`${BASE_PATH}/customers/${customerId}/events/${eventId}`, null)
  }

  unassignCustomerEventToFollow(customerId: number, eventId : number) {
    return this.http.delete(`${BASE_PATH}/customers/${customerId}/events/${eventId}`)

  }
}
