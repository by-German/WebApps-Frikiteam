import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './pages/app/app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { SignupFrikiComponent } from './pages/signup-friki/signup-friki.component';
import { SignupOrganizerComponent } from './pages/signup-organizer/signup-organizer.component';
import { MatToolbarModule} from "@angular/material/toolbar";
import { MatButtonModule} from "@angular/material/button";
import { HttpClientModule} from "@angular/common/http";
import { MatGridListModule} from "@angular/material/grid-list";
import { FormsModule} from "@angular/forms";
import { MatIconModule} from "@angular/material/icon";
import { MatFormFieldModule} from "@angular/material/form-field";
import { MatInputModule} from "@angular/material/input";
import { MatPaginatorModule} from "@angular/material/paginator";
import { MatTableModule} from "@angular/material/table";
import {MatCardModule} from "@angular/material/card";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    SignupFrikiComponent,
    SignupOrganizerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatGridListModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatPaginatorModule,
    HttpClientModule,
    MatTooltipModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
