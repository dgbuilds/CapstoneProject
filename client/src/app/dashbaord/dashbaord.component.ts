// import { Component, OnInit } from '@angular/core';
// import { Router } from '@angular/router';
// import { AuthService } from '../../services/auth.service';
// import { HttpService } from '../../services/http.service';

// @Component({
//   selector: 'app-dashbaord',
//   templateUrl: './dashbaord.component.html',
//   styleUrls: ['./dashbaord.component.scss']
// })
// export class DashbaordComponent implements OnInit {

//   role:string|null ='';
//   events:any[]=[];
//   resources: any[] =[];
//   clients: any[] =[];
//   bookingEvents:any[]=[];

//   constructor(private authService:AuthService,private httpService:HttpService, private router:Router){}

//   ngOnInit(): void {
//     this.role = this.authService.getRole();
//     console.log(this.role);
//     if(this.role ==="PLANNER"){
//       this.loadPlanner();
//     }else if(this.role === "STAFF"){
//       this.loadStaff();
//     }else{
//       this.loadClient();
//     }
//   }
//   loadStaff() {
//     this.httpService.GetAllevents().subscribe(res =>{
//       this.bookingEvents = res;
//     })
    
//   }

//   loadClient() {
//     this.router.navigate([`/booking-details`])
//   }



//   loadPlanner(){
//     this.httpService.GetAllevents().subscribe((res)=>{
//       this.events = res;
//     })
//     this.httpService.GetAllResources().subscribe((res)=>{
//       this.resources = res;
//     })
//     this.httpService.getClients().subscribe((res)=>{
//       this.clients = res;
//     })
//   }


// }



import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { HttpService } from '../../services/http.service';
import { 
  faCalendar, 
  faEllipsisV, 
  faClipboard, 
  faPlus, 
  faShare, 
  faCalendarPlus, 
  faEdit, 
  faSignOutAlt,
  faCheck,
  faTimes 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashbaord.component.html',
  styleUrls: ['./dashbaord.component.scss']
})
export class DashbaordComponent implements OnInit {
  // Icons
  faCalendar = faCalendar;
  faEllipsisV = faEllipsisV;
  faClipboard = faClipboard;
  faPlus = faPlus;
  faShare = faShare;
  faCalendarPlus = faCalendarPlus;
  faEdit = faEdit;
  faSignOutAlt = faSignOutAlt;
  faCheck = faCheck;
  faTimes = faTimes;

  // Component properties
  role: string | null = '';
  isDropdownOpen = false;
  viewingRequests = false;
  requests: any[] = [];
  events: any[] = [];
  resources: any[] = [];
  clients: any[] = [];
  bookingEvents: any[] = [];

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    if (this.role === "PLANNER") {
      this.loadPlanner();
    }
  }

  toggleDropdown() {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleViewRequests() {
    this.viewingRequests = !this.viewingRequests;
    if (this.viewingRequests) {
      this.loadRequests();
    }
  }

  loadRequests() {
    this.httpService.getRequests().subscribe((res: any[]) => {
      this.requests = res;
    });
  }

  handleRequest(requestId: number, action: 'approve' | 'reject') {
    this.httpService.handleRequest(requestId, action).subscribe(() => {
      this.loadRequests(); // Reload requests after action
    });
  }

  navigate(route: string) {
    this.router.navigate([route]);
    this.isDropdownOpen = false;
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  loadPlanner() {
    this.httpService.GetAllevents().subscribe((res) => {
      this.events = res;
    });
    this.httpService.GetAllResources().subscribe((res) => {
      this.resources = res;
    });
    this.httpService.getClients().subscribe((res) => {
      this.clients = res;
    });
  }
}


