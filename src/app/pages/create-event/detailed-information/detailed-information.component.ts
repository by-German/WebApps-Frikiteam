import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {AuthService} from "../../../services/auth.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {EventItinerariesApiService} from "../../../services/event/event-itineraries-api.service";
import {EventsInformationApiService} from "../../../services/event/events-information-api.service";
import {CloudinaryApiService} from "../../../services/cloudinary-api.service";

@Component({
  selector: 'app-detailed-information',
  templateUrl: './detailed-information.component.html',
  styleUrls: ['./detailed-information.component.css']
})
export class DetailedInformationComponent implements OnInit {
  eventId: number = -1
  modeEdit: Boolean = false

  // itineraries
  listItineraries : any[] = [];
  countIt : number = 0;
  beginEditIt: number = 0;
  itineraries = new FormGroup({
    itinerary1: new FormControl('', [Validators.required]),
  })

  // information
  listInformation : any[] = [];
  countInf : number = 0;
  beginEditInf: number = 0;
  information = new FormGroup({
    title1: new FormControl('', [Validators.required]),
    description1: new FormControl('', [Validators.required])
  })
  pathImg : any[] = []
  files : any[] = [];
  isLoading : Boolean = false;


  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private itinerariesService: EventItinerariesApiService,
    private informationService: EventsInformationApiService,
    private cloudinary: CloudinaryApiService,
    private authService: AuthService,
    private tokenStorageService: TokenStorageService) {
  }

  ngOnInit(): void {
    this.eventId = this.route.snapshot.params.id
    this.modeEdit = this.route.snapshot.queryParams["mode_edit"]

    if (this.modeEdit) {
      this.itinerariesService.getAllByEventId(this.eventId)
        .subscribe( (result: any) => {
          for (let i = 0; i < result.length; i++) {
            if (i == 0) {
              this.itineraries.controls["itinerary1"].setValue(result[i].name)
              this.itineraries.controls["itinerary1"].disable()
            }
            this.addItinerary(result[i].name)
          }
          this.beginEditIt = result.length + 1
        })
      this.informationService.getEventInformation(this.eventId)
        .subscribe((result:any) => {
          for (let i = 0; i < result.length; i++) {
            if (i == 0) {
              this.information.controls['title1'].setValue(result[i].title)
              this.information.controls['description1'].setValue(result[i].description)
            }
            this.addInformation(result[i].title, result[i].description)
            this.pathImg.push(result[i].image)
          }
          this.beginEditInf = result.length + 1
        })
    } else {
      this.listItineraries.push(++this.countIt)
      this.listInformation.push(++this.countInf)
    }
  }

  async onSubmit() {
    this.isLoading = true;
    await this.onSubmitItineraries()
    await this.onSubmitInformation()
    this.isLoading = false;
    this.router.navigate([`create-event/${this.eventId}/optional-information`]).then()
  }

  /*
  * Itineraries
  * */
  addItinerary(value: string = '') {
    this.listItineraries.push(++this.countIt);
    this.itineraries.addControl("itinerary" + this.countIt, new FormControl(value, [Validators.required]))
    if (value != '') this.itineraries.controls["itinerary" + this.countIt].disable()
  }
  onSubmitItineraries(): void {
    if (this.itineraries.invalid) {
      return;
    }

    for (let i = 1; i < this.countIt + 1; i++) {
      this.itinerariesService.postByEventId(this.eventId, {
        name: "" + this.itineraries.value[`itinerary${i}`]
      }).subscribe(result => {})
    }
  }
  onSaveItineraries(): void {
    for (let i = this.beginEditIt; i <= this.listItineraries.length; i++) {
      this.itinerariesService.postByEventId(this.eventId, {
        name: "" + this.itineraries.value[`itinerary${i}`]
      }).subscribe(result => {})
    }
  }
  /*
  * Information
  * */
  addInformation(title: string = '', description: string = '') {
    this.listInformation.push(++this.countInf);
    this.information.addControl("title" + this.countInf, new FormControl(title, [Validators.required]))
    this.information.addControl("description" + this.countInf, new FormControl(description, [Validators.required]))
  }
  onSubmitInformation(): void {
    if (this.information.invalid) {
      return;
    }
    for (let i = 1; i < this.countInf + 1; i++) {
      // generate link img
      let ref = this.cloudinary.reference(this.files[i - 1].name)
      this.cloudinary.post(this.files[i-1]).then(result => {
        ref.getDownloadURL().subscribe((url: any) => {
          // creation of event information
          this.informationService.postEventInformation(this.eventId, {
            title: "" + this.information.value[`title${i}`],
            description: "" + this.information.value[`description${i}`],
            image: "" + url
          }).subscribe(result => {});
        })
      })
    }
  }
  onChange() {
    let img = document.getElementById('input-img');
    // @ts-ignore
    this.files.push(img.files[0])
    // @ts-ignore
    let path = URL.createObjectURL(img.files[0]);
    this.pathImg.push(path)
  }

  async onSave() {
    await this.onSaveItineraries()
  }
}
