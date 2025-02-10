import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterEvent } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { ActionReducer } from '@ngrx/store';
 
 
@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})

export class BookingDetailsComponent implements OnInit{
  eventDetails: any = null;
  errorMessage: string ='';
  constructor(
    private route : ActivatedRoute,
    private http:HttpService
  ){}
  ngOnInit(): void {
    const eventId = this.route.snapshot.paramMap.get('eventId');
    if(eventId){
      this.loadEventDetails(eventId);
    }
  }
  loadEventDetails(eventId: string): void{
    this.http.GetEventdetails(eventId).subscribe({
      next:(details) =>{
        this.eventDetails = details;
      },
      error: () => {
        this.errorMessage = 'Somethings gone wrong, Faied to load event details.'
      }
    });
  }
 
}
