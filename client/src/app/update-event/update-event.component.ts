import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  events: any[] = [];
  itemForm: FormGroup;
  successMessage: string = '';
  update:Boolean = true;
  eventId:any;


  constructor(private httpService: HttpService, private fb: FormBuilder, private router:Router) {
    this.itemForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      status: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.httpService.GetAllevents().subscribe((res)=>this.events = res)
    
  }

  updateEvent() {
    if (this.itemForm.valid) {
      this.httpService.updateEvent(this.eventId, this.itemForm.value).subscribe({
        next: () => {
          this.successMessage = "Updated Successfully";
          setTimeout(() => this.successMessage = '', 3000);
          this.router.navigate(["/dashboard"])
        }
      })
    }
  }

  selectedEvent(eventId:any){
    this.update = !this.update;
    this.eventId = eventId;
    this.httpService.GetEventdetails(eventId).subscribe((res)=>this.itemForm.patchValue(res))
  }

}
