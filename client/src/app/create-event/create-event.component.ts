import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})

export class CreateEventComponent
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
      status:['PENDING' , Validators.required],
    });
  }
  onSubmit():void{
    console.log("create event button clicked");
    console.log(this.itemForm.valid);
    console.log(this.itemForm.value);
    if(this.itemForm.valid){
      this.httpService.createEvent(this.itemForm.value).subscribe({
        next: () =>{
        this.router.navigate(['/view-events']);
      },
      error: (error) =>{
        this.errorMessage = 'Failed to create event ,Please try again.' ;
      }});
    }
  }

}
