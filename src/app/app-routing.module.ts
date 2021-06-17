import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./pages/login/login.component";
import {SignupFrikiComponent} from "./pages/signup-friki/signup-friki.component";
import {SignupOrganizerComponent} from "./pages/signup-organizer/signup-organizer.component";
import {HomeComponent} from "./pages/home/home.component";

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  {path: 'signup/friki', component: SignupFrikiComponent},
  {path: 'signup/organizer', component: SignupOrganizerComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
