import {AfterViewInit, ChangeDetectorRef, Component, NgZone, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {CloudinaryApiService} from "../../../services/cloudinary-api.service";
import {OrganizerEventApiService} from "../../../services/event/organizer-event-api.service";
import {PlacesApiService} from "../../../services/event/places-api.service";
import {EventsApiService} from "../../../services/event/events-api.service";

@Component({
  selector: 'app-general-information',
  templateUrl: './general-information.component.html',
  styleUrls: ['./general-information.component.css']
})
export class GeneralInformationComponent implements OnInit {

  form : FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
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

  file : any;
  countries: any[] = []
  cities: any[] = []
  districts: any[] = []
  selectedValue: string | undefined;
  pathImg : string | undefined
  eventId: number = -1
  organizerId : number = -1
  modeEdit: Boolean = false
  event : any = {}

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService,
    private cloudinary: CloudinaryApiService,
    private organizerEventService: OrganizerEventApiService,
    private placeService: PlacesApiService,
    private eventService: EventsApiService) { }

  ngOnInit(): void {
    this.modeEdit = this.route.snapshot.queryParams['mode_edit']
    this.eventId = this.route.snapshot.queryParams['id']
    this.organizerId = this.tokenStorageService.getAuthUser().id

    if (this.modeEdit) {
      this.eventService.getEventById(this.eventId).subscribe( (result: any) => {
        this.event = result
        this.form.controls["name"].setValue(result.name)
        this.form.patchValue({ information: result.information });
        this.form.setControl("quantity", new FormControl(result.quantity))
        this.pathImg = result.logo
      })
    }

    this.getCountries()
  }

  onSubmit(): void { // this only for mode create
    if (this.form.invalid) return

    // first execute onChange "validate"

    // creation of link of event logo
    let ref = this.cloudinary.reference(this.file.name)
    this.cloudinary.post(this.file).then(result => {
      ref.getDownloadURL().subscribe((url: any) => {
        this.form.value.logo = url

        // creation place
        let place: any  = {
          name: this.form.value.place,
          reference: this.form.value.reference
        }
        this.placeService.postPlaces(this.form.value.districtId, place)
          .subscribe((result: any) => {
            this.form.value.placeId = result.id

            // creation event by an organizer
            this.organizerEventService.createNewEvent(this.form.value, this.organizerId)
              .subscribe(result => {

                // navigate next form
                this.router.navigate([`create-event/${result.id}/detailed-information`])
                  .then(() => {});
              })

          })

      })
    })

  }

  onChange() {
    // @ts-ignore
    let img = document.getElementById('input-img');
    // @ts-ignore
    this.file  = img.files[0]
    this.pathImg = URL.createObjectURL(this.file);
  }

  getCountries() {
    this.placeService.getCountries().subscribe((result: any) => {
      this.countries = result.content
    })
  }

  getCities(e: any) {
    this.placeService.getCities(e).subscribe((result: any) => {
      // the form between have the value of id
      this.cities = result
    })
  }

  getDistricts(e: any) {
    this.placeService.getDistricts(e).subscribe((result: any) => {
      // the form between have the value of id
      this.districts = result
    })
  }

  postPlace() {
    let place: any  = {
      name: this.form.value.place,
      reference: this.form.value.reference
    }

    this.placeService.postPlaces(this.form.value.districtId, place)
      .subscribe(result => {})
  }

  save() { // this only for mode update
    let ref = this.cloudinary.reference(this.file.name)
    this.cloudinary.post(this.file).then(result => {
      ref.getDownloadURL().subscribe((url: any) => {
        this.event.name = this.form.value.name
        this.event.information = this.form.value.information
        this.event.quantity = this.form.value.quantity
        this.event.logo = url
        this.organizerEventService.updateEvent(this.event, this.organizerId, this.eventId)
          .subscribe((_) => this.router.navigate([`user-profile/${this.organizerId}`]).then())
      })
    })
  }
}
