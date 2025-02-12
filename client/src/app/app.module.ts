import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RegistrationComponent } from './registration/registration.component';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpService } from '../services/http.service';
import { DashbaordComponent } from './dashbaord/dashbaord.component';
import { CreateEventComponent } from './create-event/create-event.component';
import { AddResourceComponent } from './add-resource/add-resource.component';
import { ResourceAllocateComponent } from './resource-allocate/resource-allocate.component';
import { BookingDetailsComponent } from './booking-details/booking-details.component';
import { ViewEventsComponent } from './view-events/view-events.component';
import { AuthInterceptorInterceptor } from './auth-interceptor.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HomeComponent } from './home/home.component';
import { UpdateEventComponent } from './update-event/update-event.component';
import { BookingEventComponent } from './booking-event/booking-event.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegistrationComponent,
    DashbaordComponent,
    CreateEventComponent,
    AddResourceComponent,
    ResourceAllocateComponent,
    BookingDetailsComponent,
    ViewEventsComponent,
    HomeComponent,
    UpdateEventComponent,
    BookingEventComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FontAwesomeModule
  ],
  providers: [HttpService, HttpClientModule , 
    {
      provide : HTTP_INTERCEPTORS,
      useClass : AuthInterceptorInterceptor,
      multi : true
    }
  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
