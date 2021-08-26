import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./pages/home/home.component";
import {EventComponent} from "./pages/event/event.component";
import {LoginComponent} from "./pages/login/login.component";
import {CreateEventComponent} from "./pages/create-event/create-event.component";
import {CreateComponent} from "./pages/create/create.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {RegisterComponent} from "./pages/register/register.component";
import {EventLocationComponent} from "./pages/event-location/event-location.component";
import {OrganizerProfileComponent} from "./pages/organizer-profile/organizer-profile.component";
import {EventInformationComponent} from "./pages/event-information/event-information.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: HomeComponent},
  { path: 'events/:id', component: EventComponent,
    children: [
      { path: '', component: EventInformationComponent },
      { path: 'information', component: EventInformationComponent },
      { path: 'location', component: EventLocationComponent}
    ]},
  { path: 'login', component: LoginComponent },
  { path: 'create-event', component: CreateEventComponent },
  { path: 'create', component: CreateComponent},
  { path: 'user-profile', component: UserProfileComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'organizer-profile', component: OrganizerProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
