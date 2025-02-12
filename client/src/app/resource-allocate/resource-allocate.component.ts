import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { NgIfContext } from '@angular/common';
@Component({
  selector: 'app-resource-allocate',
  templateUrl: './resource-allocate.component.html',
  styleUrls: ['./resource-allocate.component.scss']
})
export class ResourceAllocateComponent implements OnInit{
    itemForm: FormGroup;
    events: any[] = [];
    resources: any[] = [];
    errorMessage: string = '';
    successMessage: string = '';
   
    constructor(private httpService:HttpService, private fb:FormBuilder, private router:Router){
        this.itemForm = this.fb.group({
            eventId: ['', Validators.required],
            resourceId: ['', Validators.required],
            quantity: ['', [Validators.required, Validators.min(1)]]
        });
    }

    ngOnInit(): void {
        this.loadEvents();
        this.loadResources();
        // console.log(this.events);
        // console.log(this.resources);
    }
 
    loadEvents(): void{
        this.httpService.GetAllevents().subscribe({
            next: (events) => {
                this.events = events;
            },
            error: () => {
                this.errorMessage = 'Failed to load events.';
            }
 
        });
       
    }
 
    loadResources(): void{
        this.httpService.GetAllResources().subscribe({
            next: (resources) => {
                console.log(resources);
                this.resources = resources;
            },
            error: () => {
                this.errorMessage = 'Failed to load resources';
            }
        });
    }
 
    onSubmit(): void {
        console.log(this.itemForm.valid);
        console.log(this.itemForm.value);
      if(this.itemForm.valid){
          //const {eventId, resourceId, quantity} = this.itemForm.value;
          
          this.httpService.allocateResources(this.itemForm.value.eventId, this.itemForm.value.resourceId, this.itemForm.value).subscribe({
              next: () => {
                  this.itemForm.reset();
                  this.loadResources();
                  this.successMessage = 'Resource saved successfully';
                  setTimeout(()=> this.successMessage = '',3000);
                  this.router.navigate(["/dashboard"])
                  
              },
              error: () => {
                  this.errorMessage = 'Failed to allocate resource'
              }
          });
      }
    }
 
}
 