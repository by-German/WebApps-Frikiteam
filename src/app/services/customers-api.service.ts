import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Observable, throwError} from "rxjs";
import {Customer} from "../models/customer";
import {catchError, retry} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class CustomersApiService {
  // Customers Endpoints

  basePath = 'http://localhost:3000/api/customers';
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private http: HttpClient) {  }

  // Create Customer
  addCustomer(item: any): Observable<Customer> {
    return this.http.post<Customer>(this.basePath, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }

  // Get Customer by Id
  getCustomerById(id: number): Observable<Customer> {
    return this.http.get<Customer>(`${this.basePath}/${id}`, this.httpOptions )
      .pipe(retry(2), catchError(this.handleError));
  }
  // Get Customer Data
  getAllCustomers(): Observable<Customer>{
    return this.http.get<Customer>(this.basePath)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Update Customer
  updateCustomer(id: number, item: Customer): Observable<Customer>{
    return this.http.put<Customer>(`${this.basePath}/${id}`, JSON.stringify(item), this.httpOptions)
      .pipe(retry(2), catchError(this.handleError));
  }
  // Delete Customer
  deleteCustomer(id: number): Observable<any> {
    return this.http.delete<Customer>(`${this.basePath}/${id}`, this.httpOptions)
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
