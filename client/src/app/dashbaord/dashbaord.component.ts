import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-dashbaord',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {

  role:string|null ='';
  events:any[]=[];
  resources: any[] =[];
  clients: any[] =[];
  bookingEvents:any[]=[];

  constructor(private authService:AuthService,private httpService:HttpService, private router:Router){}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    console.log(this.role);
    if(this.role ==="PLANNER"){
      this.loadPlanner();
    }else if(this.role === "STAFF"){
      this.loadStaff();
    }else{
      this.loadClient();
    }
  }
  loadStaff() {
    this.httpService.GetAllevents().subscribe(res =>{
      this.bookingEvents = res;
    })
    
  }

  loadClient() {
    this.router.navigate([`/booking-details`])
  }



  loadPlanner(){
    this.httpService.GetAllevents().subscribe((res)=>{
      this.events = res;
    })
    this.httpService.GetAllResources().subscribe((res)=>{
      this.resources = res;
    })
    this.httpService.getClients().subscribe((res)=>{
      this.clients = res;
    })
  }


}
