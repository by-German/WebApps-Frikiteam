import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Organizer} from "../models/organizer";
import { Observable } from 'rxjs';
import {BASE_PATH} from "./common/http.common";

@Injectable({
  providedIn: 'root'
})
export class OrganizersApiService {

  constructor(private http: HttpClient) { }

  getOrganizerById(id : number) : Observable<Organizer>{
    return this.http.get<Organizer>(BASE_PATH + `/organizers/${id}`)
  }

  addOrganizer(organizer : Organizer): Observable<Organizer> {
    return this.http.post<Organizer>(BASE_PATH + "/organizers", organizer);
  }

}
