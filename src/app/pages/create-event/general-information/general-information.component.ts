import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";

interface Name {
  id: number;
  name: string;
}


@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent implements OnInit {
  form = new FormGroup({
    title: new FormControl('', [Validators.required]),
    information: new FormControl('', [Validators.required, Validators.maxLength(130)]),
    countryId: new FormControl('', [Validators.required]),
    cityId: new FormControl('', [Validators.required]),
    districtId: new FormControl('', [Validators.required]),
    place: new FormControl('', [Validators.required]),
    reference: new FormControl(''),
    price: new FormControl('', [Validators.required]),
    quantity: new FormControl('', [Validators.required]),
    startDate: new FormControl('', [Validators.required]),
    endDate: new FormControl('', [Validators.required])
  })

  selectedValue: string | undefined;
  foods: Name[] = [
    {id: 1, name: 'Peru'},
    {id: 2, name: 'Lima'},
    {id: 3, name: 'Chorrillos'},
    {id: 5, name: 'Arequipa'}
  ];

  constructor(private router: Router, private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }
  ngOnInit(): void {
  }
  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }
}
