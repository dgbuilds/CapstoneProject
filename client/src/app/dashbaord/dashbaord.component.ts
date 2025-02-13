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
  faTimes,
  faUser,
  faBuilding
} from '@fortawesome/free-solid-svg-icons';

interface Event {
  id: number;
  title: string;
  description: string;
  dateTime: string;
  location: string;
  status: string;
}

interface Resource {
  id: number;
  name: string;
  type: string;
  availability: boolean;
}

interface Client {
  id: number;
  username: string;
  email: string;
}

// interface Request {
//   id: number;
//   eventTitle: string;
//   clientName: string;
//   status: string;
// }

interface BookingDetail {
  bookingID: number;
  title: string;
  description : string;
  expectedCount : number;
  dateTime: string;
  location: string;
  status: string;
}

@Component({
  selector: 'app-dashbaord',
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
  faUser = faUser;
  faBuilding = faBuilding;

  // Component properties
  role: string | null = '';
  isDropdownOpen = false;
  viewingRequests = false;
  viewingEvents = false;
  
  // Data arrays
  requests: BookingDetail[] = [];
  events: Event[] = [];
  resources: Resource[] = [];
  clients: Client[] = [];
  bookingEvents: any[] = [];
  bookingDetails: BookingDetail[] = [];

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.role = this.authService.getRole();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    switch(this.role) {
      case 'PLANNER':
        this.loadPlannerData();
        break;
      case 'CLIENT':
        this.loadClientData();
        break;
      case 'STAFF':
        this.loadStaffData();
        break;
    }
  }

  loadPlannerData(): void {
    this.httpService.GetAllevents().subscribe({
      next: (res) => this.events = res,
      error: (error) => console.error('Error loading events:', error)
    });

    this.httpService.GetAllResources().subscribe({
      next: (res) => this.resources = res,
      error: (error) => console.error('Error loading resources:', error)
    });

    this.httpService.getClients().subscribe({
      next: (res) => this.clients = res,
      error: (error) => console.error('Error loading clients:', error)
    });
  }

  loadClientData(): void {
    this.httpService.getAllBookings().subscribe({
      next : (res) => this.bookingDetails = res,
      error : (error) => console.error('Error loading booking details:', error)
    })
    this.httpService.GetAllevents().subscribe({
      next: (res) => this.events = res,
      error: (error) => console.error('Error loading events:', error)
    });
  }

  loadStaffData(): void {
    this.httpService.getAllBookings().subscribe({
      next: (res) => this.bookingDetails = res,
      error: (error) => console.error('Error loading staff events:', error)
    })
  }

  loadRequests(): void {
    this.httpService.getRequests("pending").subscribe({
      next: (res: BookingDetail[]) => this.requests = res,
      error: (error: any) => console.error('Error loading requests:', error)
    });
  }

  handleRequest(requestId: number, action: 'approve' | 'reject'): void {
    this.httpService.handleRequest(requestId, action).subscribe({
      next: () => {
        this.loadRequests();
      },
      error: (error: any) => console.error(`Error ${action}ing request:`, error)
    });
  }

  toggleDropdown(): void {
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  toggleViewRequests(): void {
    this.viewingRequests = !this.viewingRequests;
    if (this.viewingRequests) {
      this.loadRequests();
    }
  }

  viewEvents(): void {
    this.viewingEvents = !this.viewingEvents;
  }

  navigate(route: string): void {
    this.router.navigate([route]);
    this.isDropdownOpen = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  // Helper methods for status display
  getStatusClass(status: string): string {
    return status.toLowerCase();
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }
}
