import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";

@Component({
  selector: 'app-optional-information',
  templateUrl: './optional-information.component.html',
  styleUrls: ['./optional-information.component.css']
})
export class OptionalInformationComponent implements OnInit {
  form = new FormGroup({
    website: new FormControl('', [Validators.required]),
  })

  constructor(private router: Router, private authService: AuthService, private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {  }

  onSubmit(): void {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value);
  }

}
