import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {HomeComponent} from "./pages/home/home.component";
import {EventComponent} from "./pages/event/event.component";
import {LoginComponent} from "./pages/login/login.component";
import {CreateEventComponent} from "./pages/create-event/create-event.component";
import {CreateComponent} from "./pages/create/create.component";
import {UserProfileComponent} from "./pages/user-profile/user-profile.component";
import {RegisterComponent} from "./pages/register/register.component";
import {OrganizerProfileComponent} from "./pages/organizer-profile/organizer-profile.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'events', component: HomeComponent},
  { path: 'events/:id', component: EventComponent},
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
