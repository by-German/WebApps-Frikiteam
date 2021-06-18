import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomeComponent} from "./pages/home/home.component";
import {EventComponent} from "./pages/event/event.component";

const routes: Routes = [
  { path: 'events', component: HomeComponent},
  { path: 'events/:id', component: EventComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
