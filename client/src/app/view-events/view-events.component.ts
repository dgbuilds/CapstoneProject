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
  itemForm:FormGroup;
  selectedEvent: any =null;
  successMessage: string='';
 
  constructor(private httpService:HttpService,private fb:FormBuilder){
    this.itemForm=this.fb.group({
      title:['' , Validators.required],
      description:['' , Validators.required],
      dateTime:['' , Validators.required],
      location:['' , Validators.required],
      status:['' , Validators.required]
    })
   
  }
  ngOnInit(): void {
    this.httpService.GetAllevents().subscribe({
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
    return e.eventID.toString().includes(this.searchId);
   })
   }else{
    this.filteredEvents=[...this.events];
   }
  }
 
  selectEvent(event :any){
    this.selectedEvent= {...event};
    this.itemForm.patchValue(event);
  }
 
  updateEvent(){
    if(!this.selectedEvent) return;
    this.httpService.updateEvent(this.searchId,this.itemForm.value).subscribe({
      next:()=>{
        this.successMessage= "Saved Successfully";
        this.selectedEvent=null;
        this.loadEvents();
        setTimeout(()=> this.successMessage ='',3000);
      }
    })
  }
 
 
 
}
 
 