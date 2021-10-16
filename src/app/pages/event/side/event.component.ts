import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Organizer} from "../../../models/organizer";
import {OrganizersApiService} from "../../../services/User/organizers-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {EventsApiService} from "../../../services/event/events-api.service";
import {EventItinerariesApiService} from "../../../services/event/event-itineraries-api.service";
import {FollowEventsService} from "../../../services/Social/follow-events.service";
import {FollowOrganizersService} from "../../../services/Social/follow-organizers.service";
import {TokenStorageService} from "../../../services/token-storage.service";
import {PaymentService} from "../../../services/Payment/payment.service";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import { StripeService, StripeCardComponent } from 'ngx-stripe';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {
  organizer : Organizer;
  user : any
  event : any;
  eventId : any;
  itineraries : any
  followingEvent : Boolean = false
  followingOrganizer: Boolean = false

  constructor(private organizersApi : OrganizersApiService,
              private itinerariesApi : EventItinerariesApiService,
              private followEvents : FollowEventsService,
              private followOrganizers : FollowOrganizersService,
              private paymentService: PaymentService,
              private storage: TokenStorageService,
              private router: Router,
              private route: ActivatedRoute,
              private eventsApi: EventsApiService,
              private fb: FormBuilder,
              private stripeService: StripeService) {

    this.organizer = {} as Organizer
    this.eventId = this.route.snapshot.params.id
  }

  ngOnInit(): void {
    // @ts-ignore
    document.getElementsByClassName("dialog")[0].style.visibility = 'hidden';

    this.user = this.storage.getAuthUser()
    if (this.user ) this.formPay = this.fb.group({email: [this.user.username, [Validators.required, Validators.email]]});
    else this.formPay = this.fb.group({email: ['', [Validators.required, Validators.email]]});


    this.eventsApi.getEventById(this.eventId).subscribe((result: any) => {
      // event
      this.event = result;
      if (this.user) this.isFollowingEvent()

      // organizer
      this.organizersApi.getOrganizerById(result.organizerId)
        .subscribe( ( result => {
          this.organizer = result;
          if (this.user) this.isFollowingOrganizer()
        }));
    })

    this.itinerariesApi.getAllByEventId(this.eventId)
      .subscribe(result => this.itineraries = result)

  }

  followEvent(id: number) {
    this.followEvents.assignCustomerEventToFollow(this.user.id, id)
      .subscribe(result => this.followingEvent = true)
  }

  notFollowEvent(id: number) {
    this.followEvents.unassignCustomerEventToFollow(this.user.id, id)
      .subscribe(result => this.followingEvent = false)
  }

  isFollowingEvent() {
    this.followEvents.getEventsFollowedByCustomer(this.user.id)
      .subscribe((result:any) => {
        for (let i = 0; i < result.content.length; i++) {
          if (result.content[i].id == this.event.id) {
            this.followingEvent = true
            return
          }
        }
      })
  }

  followOrganizer(id: number) {
    this.followOrganizers.assignCustomerOrganizerToFollow(this.user.id, id)
      .subscribe(result => this.followingOrganizer = true)
  }
  notFollowOrganizer(id: number) {
    this.followOrganizers.unassignCustomerOrganizerToFollow(this.user.id, id)
      .subscribe(result => this.followingOrganizer = false)
  }
  isFollowingOrganizer() {
    this.followOrganizers.getOrganizersFollowedByCustomer(this.user.id)
      .subscribe((result:any) => {
        for (let i = 0; i < result.content.length; i++) {
          if (result.content[i].id == this.organizer.id) {
            this.followingOrganizer = true
            return
          }
        }
      })
  }

  renderLocation(id: number): void {
    this.router.navigate(['/events/'+id+'/location'])
      .then(() => console.log('Navigate to event location with id' + id));
  }

  renderInformation(id: number): void {
    this.router.navigate(['/events/'+id+'/information'] )
      .then(() => console.log('render event information with id' + id));
  }

  //@ts-ignore
  @ViewChild(StripeCardComponent) card: StripeCardComponent;
  //@ts-ignore
  formPay: FormGroup;
  error : String | undefined

  renderPayment(): void {
    // @ts-ignore
    document.getElementsByClassName("dialog")[0].style.visibility = 'visible';
    // if (!this.user)

  }

  createToken(): void {
    const email = this.formPay.get('email')?.value;
    let id = 0
    if (this.user) id = this.user.id
    this.stripeService.createToken(this.card.element, { name: email })
      .subscribe((result) => {
        if (result.token) {
          let item = {
            description: this.event.name,
            amount: this.event.price * 100,
            currency: 'pen',
            email: email,
            customerId: id,
            eventId: this.event.id,
          };
          this.paymentService.createPayment(item).subscribe((result: any) => {
            this.paymentService.confirmPayment(result.id).subscribe((confirm:any)=> {
              //@ts-ignore
              document.getElementsByClassName("dialog")[0].style.visibility = 'hidden';
              window.open(confirm.charges.data[0]['receipt_url']);
            })
          })
        } else if (result.error) {
          this.error = result.error.message;
        }
      });
  }

  cancelBuy() {
    // @ts-ignore
    document.getElementsByClassName("dialog")[0].style.visibility = 'hidden';
    return
  }
}

