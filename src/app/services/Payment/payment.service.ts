import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BASE_PATH} from "../common/http.common";

@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }
  constructor(private http: HttpClient) {

  }

  createPayment(item: any) {
    return this.http.post<any>(BASE_PATH + "/payments", JSON.stringify(item), this.httpOptions);
  }

  confirmPayment(id: number) {
    return this.http.get(BASE_PATH + "/payments/"+id, this.httpOptions);
  }

  getAllTicketsByCustomerId(id: number) {
    return this.http.get(BASE_PATH + "/payments/customers/"+id, this.httpOptions);
  }
}
