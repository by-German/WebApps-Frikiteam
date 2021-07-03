import { Injectable } from "@angular/core";
import { BASE_PATH } from "./common/http.common";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { Model } from "../models/event";
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

  constructor(private  http: HttpClient) {
  }

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }


  createNewEvent(item: any, id: number): Observable<any> {
    return this.http.post(`${BASE_PATH}/organizers/${id}/events`, JSON.stringify({
      logo: "default",
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
