import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { faCalendar, faSignOutAlt, faDashboard } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-booking-event',
  templateUrl: './booking-event.component.html',
  styleUrls: ['./booking-event.component.scss']
})
export class BookingEventComponent implements OnInit
{
  itemForm: FormGroup;
  errorMessage: String= '';
  id:string|null ='';
  event:any;
  faCalendar = faCalendar;
  faSignOutAlt = faSignOutAlt;
  faDashboard = faDashboard;
  constructor(
    private fb:FormBuilder,
    private route:ActivatedRoute,
    private httpService: HttpService,
    private router:Router
  ){
    this.itemForm = this.fb.group({
      title:['' , Validators.required],
      description:['' , Validators.required],
      dateTime:['' , Validators.required],
      location:['' , Validators.required],
      expectedCount:[null,Validators.required],
      status:[{value:"Pending", disabled:true} , Validators.required],
    });
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id');
    console.log(this.id);
    this.httpService.GetEventdetails(this.id).subscribe((res)=>this.event = res);
  }
  onSubmit():void{
    console.log(this.itemForm.value)
    if(this.itemForm.valid){
      this.itemForm.get('status')?.enable()
      this.httpService.createBooking({...this.itemForm.value,event:this.event}).subscribe({
        next: () =>{
        this.router.navigate(['/dashboard']);
      },
      error: () =>{
        this.errorMessage = 'Failed to create event ,Please try again.' ;
      }});
    }
  }

  navigateToDashboard() : void {
    this.router.navigate(['/dashboard']);

  logout() {
    // Implement your logout logic here
    this.router.navigate(['/login']);
  }

}

