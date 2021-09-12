import { Injectable } from "@angular/core";
import { BASE_PATH } from "../common/http.common";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { Model } from "../../models/event";
import {catchError, retry} from "rxjs/operators";

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
}
