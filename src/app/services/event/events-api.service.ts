import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { Model } from "../../models/event";
import { BASE_PATH } from "../common/http.common";

@Injectable({
  providedIn: 'root'
})
export class EventsApiService {
  //Endpoint
  basePath1 = BASE_PATH + '/organizers';
  basePath2 = BASE_PATH + '/customers';
  basePath3 = BASE_PATH + ':id/qualification';
  basePath = BASE_PATH + '/events';

  httpOptions = { headers: new HttpHeaders({ 'Content-Type': 'application/json'})};


  constructor(private http: HttpClient) { }

  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

  getEventById(id : number): any {
    return this.http.get<any>(BASE_PATH + `/events/${id}`)
  }


  getAllEvents(): any {
    return this.http.get<Model.Event[]>(this.basePath);
  }

  getSearchEvents(nameEvent : String) : any {
    return this.http.get(BASE_PATH + `/events/search?name=${nameEvent}`);
  }

  getEventQualification(id: number): any {
    return this.http.get<Model.Event[]>(`${this.basePath3}/${id}`, this.httpOptions);
  }

}
