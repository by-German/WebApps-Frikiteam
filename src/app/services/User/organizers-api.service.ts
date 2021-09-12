import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Organizer} from "../../models/organizer";
import {Observable, throwError} from 'rxjs';
import {BASE_PATH} from "../common/http.common";
import {catchError, retry} from "rxjs/operators";
import {FormGroup} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class OrganizersApiService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private http: HttpClient) { }



  getOrganizerById(id : number) : Observable<Organizer>{
    return this.http.get<Organizer>(BASE_PATH + `/organizers/${id}`)
  }

  addOrganizer(organizer : Organizer): Observable<Organizer> {
    return this.http.post<Organizer>(BASE_PATH + "/organizers", organizer);
  }

  updateOrganizer(id: number, item: Organizer): Observable<Organizer>{
    return this.http.put<Organizer>(`${BASE_PATH}/organizers/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }


  deleteOrganizer(id: number): Observable<any> {
    return this.http.delete<Organizer>(`${BASE_PATH}/organizers/${id}`, this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // API Error Handling
  handleError(error: HttpErrorResponse): Observable<never> {
    if (error.error instanceof ErrorEvent) {
      console.log('An error occurred: ', error.error.message);
    }
    else {
      console.log(`Backend returned code ${error.status}, body was: ${error.error}`);
    }
    return throwError('Something happened with request, please try again later.');
  }

}
