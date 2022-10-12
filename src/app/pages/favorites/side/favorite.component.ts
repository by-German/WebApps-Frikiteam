import { Component, OnInit } from '@angular/core';
import {CustomersApiService} from "../../../services/User/customers-api.service";
import {OrganizersApiService} from "../../../services/User/organizers-api.service";
import {OrganizerEventApiService} from "../../../services/event/organizer-event-api.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TokenStorageService} from "../../../services/token-storage.service";
import {FollowEventsService} from "../../../services/Social/follow-events.service";
import {FollowOrganizersService} from "../../../services/Social/follow-organizers.service";

@Component({
  selector: 'app-favorite',
  templateUrl: './favorite.component.html',
  styleUrls: ['./favorite.component.css']
})
export class FavoriteComponent implements OnInit {
  user : any
  organizers : any[] = []
  events : any[] = []

  constructor(private router: Router,
              private route: ActivatedRoute,
              private storage: TokenStorageService,
              private followEvents : FollowEventsService,
              private followOrganizers : FollowOrganizersService) { }

  ngOnInit(): void {
    this.user = this.storage.getAuthUser()
    this.getOrganizersFollowed()
  }

  getOrganizersFollowed() {
    this.followOrganizers.getOrganizersFollowedByCustomer(this.user.id)
      .subscribe((result:any) => {
        this.organizers = result.content
      })
  }

  renderFavoritesEvents() {
    this.router.navigate([`favorites`])
  }

  renderOrganizerEvents(id: number) {
    // TODO: refresh only the component FollowsComponent, not the whole page
    this.router.navigate([`favorites/organizers/${id}`])
      .then( _ => location.reload())
  }
}
