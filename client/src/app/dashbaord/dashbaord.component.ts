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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// interface Event {
//   id: number;
//   title: string;
//   description: string;
//   dateTime: string;
//   location: string;
//   status: string;
// }

// interface Resource {
//   id: number;
//   name: string;
//   type: string;
//   availability: boolean;
// }

// interface Client {
//   id: number;
//   username: string;
//   email: string;
// }

// interface Request {
//   id: number;
//   eventTitle: string;
//   clientName: string;
//   status: string;
// }

// interface BookingDetail {
//   bookingID: number;
//   title: string;
//   description: string;
//   expectedCount: number;
//   dateTime: string;
//   location: string;
//   status: string;
// }

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
  showRequestForm = false;
  requestForm: FormGroup;
  requestErrorMessage = '';

  // Data arrays
  requests: any[] = [];
  events: any[] = [];
  resources: any[] = [];
  clients: any[] = [];
  bookingEvents: any[] = [];
  bookingDetails: any[] = [];
  selectedTickets : any = 0;

  constructor(
    private authService: AuthService,
    private httpService: HttpService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.requestForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      preferredLocation: ['', Validators.required],
      preferredDate: ['', Validators.required],
      expectedPeople: ['', [Validators.required, Validators.min(1)]],
      status: [{ value: "Pending", disabled: true }, [Validators.required]]
    });
  }

  ngOnInit(): void {
    // if(this.showRequestForm){
    //   this.loadRequests();
    // }
    this.role = this.authService.getRole();
    this.loadDashboardData();
  }

  loadDashboardData(): void {
    switch (this.role) {
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
      next: (res) => this.bookingDetails = res,
      error: (error) => console.error('Error loading booking details:', error)
    })
    this.httpService.getEventByStatus("public").subscribe({
      next: (res) => this.events = res,
      error: (error) => console.error('Error loading events:', error)
    });
  }

  loadStaffData(): void {
    this.httpService.GetAllevents().subscribe({
      next: (res) => this.bookingDetails = res,
      error: (error) => console.error('Error loading staff events:', error)
    })
  }

  loadRequests(): void {
    this.httpService.getRequests("pending").subscribe({
      next: (res: any[]) => this.requests = res,
      error: (error: any) => console.error('Error loading requests:', error)
    });
  }

  handleRequest(request: any, action: 'approve' | 'reject'): void {
    if (action == 'approve') {
      this.httpService.createEvent({
        type: "private",
        title: request.name,
        description: request.description,
        dateTime: request.preferredDate,
        location: request.preferredLocation,
        status: request.status,
        tickets: 0
      }).subscribe();
    }
    if (action == 'reject') {
      this.requestErrorMessage = 'Sorry! Currently we have no resources available for the event.';
    }
    this.httpService.handleRequest(request.requestId, action).subscribe({
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
    } else {
      this.ngOnInit();
    }
  }

  toggleRequest() {
    this.showRequestForm = !this.showRequestForm;
    if (this.showRequestForm) {
    } else {
      this.ngOnInit();
    }
  }

  // Add this method to handle form submission
  onSubmitRequest() {
    console.log("here");
    if (this.requestForm.valid) {
      // Add your API call here to submit the request
      console.log(this.requestForm.value);
      this.requestForm.get('status')?.enable();
      this.httpService.createEventRequest(this.requestForm.value).subscribe({
        next: (response: any) => {
          this.showRequestForm = false;
          this.requestForm.reset();
          this.loadClientData(); // Refresh the data
        },
        error: (error: any) => console.error('Error submitting request:', error)
      });
    }
  }
  viewEvents(): void {
    //this.viewingEvents = !this.viewingEvents;
    this.router.navigate(['/view-events']);
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

  incrementTickets(event: any) {
    this.selectedTickets = this.selectedTickets + 1;
  }

  decrementTickets(event: any) {
    if (this.selectedTickets > 0) {
      this.selectedTickets--;
    }
  }

  bookTickets(event: any) {
    console.log(this.selectedTickets)
    this.httpService.checkTicketAvailability(event.eventID, this.selectedTickets).subscribe({
      next: (response: any) => {
        if (response.available) {
          this.httpService.bookTickets(event.eventID, this.selectedTickets).subscribe({
            next: () => {
              event.ticketMessage = `Successfully booked ${event.selectedTickets} tickets!`;
              event.ticketStatus = true;
              event.selectedTickets = 0;
              this.loadClientData(); // Refresh data
            },
            error: () => {
              event.ticketMessage = 'Error booking tickets. Please try again.';
              event.ticketStatus = false;
            }
          });
        } else {
          event.ticketMessage = `Only ${response.availableTickets} tickets available`;
          event.ticketStatus = false;
        }
      },
      error: (error) => {
        event.ticketMessage = 'Error checking ticket availability';
        event.ticketStatus = false;
      }
    });
  }

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
