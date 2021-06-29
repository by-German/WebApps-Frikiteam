import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Organizer} from "../models/organizer";
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizersApiService {
  basePath = "http://localhost:8080/api";

  constructor(private http: HttpClient) { }

  getOrganizerById(id : number) : Observable<Organizer>{
    return this.http.get<Organizer>(this.basePath + `/organizers/${id}`)
  }
}
