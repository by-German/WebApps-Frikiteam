import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.css']
})
export class DetailedInformationComponent implements OnInit {
  listItineraries : any[] = [];
  countIt : number = 0;
  itineraries = new FormGroup({
    itinerary1: new FormControl('', [Validators.required]),
  })

  listInformation : any[] = [];
  countInf : number = 0;
  information = new FormGroup({
    title1: new FormControl('', [Validators.required]),
    description1: new FormControl('', [Validators.required]),
    image1: new FormControl('', [Validators.required])
  })

  constructor(private router: Router, private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.listItineraries.push(++this.countIt)
    this.listInformation.push(++this.countInf)
  }

  onSubmit(): void {
    if (this.itineraries.invalid) {
      return;
    }
    console.log(this.itineraries.value);
  }

  addItinerary() {
    this.listItineraries.push(++this.countIt);
    this.itineraries.addControl("itinerary" + this.countIt, new FormControl('', [Validators.required]))
    console.log(this.itineraries.value)
  }

  addInformation() {
    this.listInformation.push(++this.countInf);
    this.information.addControl("title" + this.countInf, new FormControl('', [Validators.required]))
    this.information.addControl("description" + this.countInf, new FormControl('', [Validators.required]))
    this.information.addControl("image" + this.countInf, new FormControl('', [Validators.required]))
    console.log(this.information.value)
  }
}
