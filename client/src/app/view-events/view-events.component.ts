import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
 
 
@Component({
  selector: 'app-view-events',
  templateUrl: './view-events.component.html',
  styleUrls: ['./view-events.component.scss']
})
export class ViewEventsComponent implements OnInit{
  events : any[]=[];
  filteredEvents:any[]=[];
  searchId :string='';
  updateForm:FormGroup;
  selectedEvent: any =null;
  successMessage: string='';
 
  constructor(private httpService:HttpService,private fb:FormBuilder){
    this.updateForm=this.fb.group({
      title:[''],
      description:[''],
      dateTime:[''],
      location:[''],
      status:['']
    })
   
  }
  ngOnInit(): void {
    this.httpService.getEvents().subscribe({
      next:(data:any)=>{
        this.events=data;
        this.filteredEvents=[...this.events]
 
      }
    })
    this.loadEvents()
  }
 
  loadEvents(){
   if(this.searchId){
   this.filteredEvents= this.events.filter((e)=>{
    return e.eventId.toString().includes(this.searchId);
   })
   }else{
    this.filteredEvents=[...this.events];
   }
  }
 
  selectEvent(event :any){
    this.selectedEvent= {...event};
    this.updateForm.patchValue(event);
  }
 
  updateEvent(){
    if(!this.selectedEvent) return;
    this.httpService.updateEventSetup(this.searchId,this.updateForm.value).subscribe({
      next:()=>{
        this.successMessage= "Saved Successfully";
        this.selectedEvent=null;
        this.loadEvents();
        setTimeout(()=> this.successMessage ='',3000);
      }
    })
  }
 
 
 
}
 
 