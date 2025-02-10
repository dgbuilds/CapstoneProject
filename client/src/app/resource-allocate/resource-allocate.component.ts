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
    allocationForm: FormGroup;
    events: any[] = [];
    resources: any[] = [];
    errorMessage: string = '';
    successMessage: string = '';
   
    constructor(private httpService:HttpService, private fb:FormBuilder){
        this.allocationForm = this.fb.group({
            eventId: ['', Validators.required],
            resourceId: ['', Validators.required],
            quantity: ['', [Validators.required, Validators.min(1)]]
        });
    }
    ngOnInit(): void {
        this.loadEvents();
        this.loadResources();
    }
 
    loadEvents(): void{
        this.httpService.getEvents().subscribe({
            next: (events) => {
                this.events = events;
            },
            error: () => {
                this.errorMessage = 'Failed to load events.';
            }
 
        });
       
    }
 
    loadResources(): void{
        this.httpService.getAllResources().subscribe({
            next: (resources) => {
                this.resources = resources;
            },
            error: () => {
                this.errorMessage = 'Failed to load resources';
            }
        });
    }
 
    onSubmit(): void {
      if(this.allocationForm.valid){
          const {eventID, resourceID, quantity} = this.allocationForm.value;
          this.httpService.allocateResources(eventID, resourceID, quantity).subscribe({
              next: () => {
                  this.allocationForm.reset();
                  this.loadResources();
                  this.successMessage = 'Resource saved successfully';
              },
              error: () => {
                  this.errorMessage = 'Failed to allocate resource'
              }
          });
      }
    }
 
}
 