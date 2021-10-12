import { Injectable } from '@angular/core';
import {BASE_PATH} from "../common/http.common";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FollowOrganizersService {

  constructor(private http: HttpClient) { }

  getOrganizersFollowedByCustomer(customerId: number) {
    return this.http.get(`${BASE_PATH}/customers/${customerId}/organizers`)
  }

  assignCustomerOrganizerToFollow(customerId: number, organizerId: number) {
    return this.http.post(`${BASE_PATH}/customers/${customerId}/organizers/${organizerId}`, null)
  }

  unassignCustomerOrganizerToFollow(customerId: number, organizerId : number) {
    return this.http.delete(`${BASE_PATH}/customers/${customerId}/organizers/${organizerId}`)

  }
}
