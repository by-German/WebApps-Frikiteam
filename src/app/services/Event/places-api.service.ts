import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

import { BASE_PATH} from "../common/http.common";

@Injectable({
  providedIn: 'root'
})
export class PlacesApiService {

  constructor(private http: HttpClient) { }

  getCountries() {
    return this.http.get(`${BASE_PATH}/countries`)
  }

  getCities(countryId : number) {
    return this.http.get(`${BASE_PATH}/countries/${countryId}/cities`)
  }

  getDistricts(cityId : number) {
    return this.http.get(`${BASE_PATH}/cities/${cityId}/districts`)
  }

  getPlace(districtId: number) {
    return this.http.get(`${BASE_PATH}/districts/${districtId}/places`)
  }

  postPlaces(districtId : number, place : any) {
    return this.http.post(`${BASE_PATH}/districts/${districtId}/places`, place)
  }

}

