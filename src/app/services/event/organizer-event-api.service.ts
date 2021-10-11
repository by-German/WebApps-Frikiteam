import { Injectable } from "@angular/core";
import { BASE_PATH } from "../common/http.common";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";


const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class OrganizerEventApiService {
  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};

  constructor(private  http: HttpClient) {
  }

  createNewEvent(item: any, id: number): Observable<any> {
    return this.http.post(`${BASE_PATH}/organizers/${id}/events`, JSON.stringify({
      logo: item.logo,
      information: item.information,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      verified: 0,
      startDate: item.startDate,
      endDate: item.endDate,
      placeId: item.placeId
    }), httpOptions);
  }

  getEventsByOrganizerId(id : number) {
    return this.http.get(`${BASE_PATH}/organizers/${id}/events`)
  }

  deleteEvent(organizerId:number, eventId : number) {
    return this.http.delete(`${BASE_PATH}/organizers/${organizerId}/events/${eventId}`, httpOptions)
  }

  updateEvent(item: any, organizerId: number, eventId: number) {
    return this.http.put(`${BASE_PATH}/organizers/${organizerId}/events/${eventId}`, JSON.stringify({
      logo: item.logo,
      information: item.information,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      verified: 0,
      startDate: item.startDate,
      endDate: item.endDate,
      placeId: item.placeId
    }), httpOptions);
  }

}
