import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-booking-event',
  templateUrl: './booking-event.component.html',
  styleUrls: ['./booking-event.component.scss']
})
export class BookingEventComponent
{
  itemForm: FormGroup;
  errorMessage: String= '';
  constructor(
    private fb:FormBuilder,
    private httpService: HttpService,
    private router:Router
  ){
    this.itemForm = this.fb.group({
      title:['' , Validators.required],
      description:['' , Validators.required],
      dateTime:['' , Validators.required],
      location:['' , Validators.required],
      expectedCount:[0,Validators.required],
      status:[{value:"Pending", disabled:true} , Validators.required],
    });
  }
  onSubmit():void{
    console.log(this.itemForm.value)
    if(this.itemForm.valid){
      this.itemForm.get('status')?.enable()
      this.httpService.createBooking(this.itemForm.value).subscribe({
        next: () =>{
        this.router.navigate(['/dashboard']);
      },
      error: () =>{
        this.errorMessage = 'Failed to create event ,Please try again.' ;
      }});
    }
  }

}

