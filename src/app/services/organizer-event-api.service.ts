import { Injectable } from "@angular/core";
import { BASE_PATH } from "./common/http.common";
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import { Model } from "../models/event";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class OrganizerEventApiService {

  // EndPoints
  basePath4 = BASE_PATH + '/organizers';

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


  createNewEvent(item: any, id: number): Observable<Model.Event> {
    return this.http.post<Model.Event>(`${BASE_PATH}/organizers/${id}/events`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
}
