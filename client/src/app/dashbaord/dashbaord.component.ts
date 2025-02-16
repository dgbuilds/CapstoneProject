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
  faBuilding,
  faTicketAlt,
  faLocationDot,
  faUsers
} from '@fortawesome/free-solid-svg-icons';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
  faTicketAlt = faTicketAlt;
  faLocationDot = faLocationDot;
  faUsers = faUsers;

  // Component properties
  role: string | null = '';
  isDropdownOpen = false;
  viewingRequests = false;
  viewingEvents = false;
  showRequestForm = false;
  requestForm: FormGroup;
  requestErrorMessage = '';
  ticketMessage = '';
  ticketStatus : boolean = false;
  myEvents:Boolean = false;
  requestStatusMessage : any = '';
  requestStatus : any = true;

  // Data arrays
  requests: any[] = [];
  events: any[] = [];
  resources: any[] = [];
  clients: any[] = [];
  bookingEvents: any[] = [];
  bookingDetails: any[] = [];
  selectedTickets : any = 0;
  clientId:any;
  requestedEvents: any[] = [];

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
    //this.clientId = 1;
    this.clientId = this.authService.getUserID();
    console.log(this.clientId);

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
    this.httpService.getClientBookedEvents(this.clientId).subscribe({
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

  handleRequest(request: any, action: any): void {
    if (action == 'approve') {
      this.requestStatusMessage = 'Approved';
      this.requestStatus = true;
      console.log(this.requestStatusMessage);
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
      this.requestStatusMessage = 'Sorry! Currently we have no resources available for the event.';
      this.requestStatus = false;
      console.log(this.requestStatusMessage);
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

  onSubmitRequest() {
    if (this.requestForm.valid) {
      this.requestForm.get('status')?.enable();
      this.httpService.createClientRequest(this.clientId,this.requestForm.value).subscribe({
        next: (response: any) => {
          this.showRequestForm = false;
          this.requestForm.reset();
          this.loadClientData(); 
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

  // Replace the single selectedTickets property with a map
  selectedTicketsMap: Map<number, number> = new Map();
  
  // Update the increment/decrement methods to handle per-event tickets
  incrementTickets(eventId: number) {
    const currentCount = this.selectedTicketsMap.get(eventId) || 0;
    this.selectedTicketsMap.set(eventId, currentCount + 1);
  }
  
  decrementTickets(eventId: number) {
    const currentCount = this.selectedTicketsMap.get(eventId) || 0;
    if (currentCount > 0) {
      this.selectedTicketsMap.set(eventId, currentCount - 1);
    }
  }
  
  // Update the bookTickets method to use the map
  bookTickets(event: any) {
    const ticketCount = this.selectedTicketsMap.get(event.eventID) || 0;
    
    this.httpService.checkTicketAvailability(event.eventID, ticketCount).subscribe({
      next: (response: any) => {
        console.log(response);
        if (response.available) {
          this.httpService.bookEventTickets(this.clientId, event.eventID, ticketCount).subscribe({
            next: () => {
              event.ticketMessage = `Successfully booked ${ticketCount} tickets!`;
              event.ticketStatus = true;
              this.selectedTicketsMap.set(event.eventID, 0); // Reset count after booking
              this.loadClientData();
            },
            error: () => {
              this.ticketMessage = 'Error booking tickets. Please try again.';
              this.ticketStatus = false;
            }
          });
        } else {
          this.ticketMessage = `Only ${response.availableTickets} tickets available`;
          this.ticketStatus = false;
        }
      },
      error: (error) => {
        this.ticketMessage = 'Error checking ticket availability';
        this.ticketStatus = false;
      }
    });
  }
  

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }

  toggleEvents(){
    this.myEvents = !this.myEvents;
    this.httpService.getClientRequests(this.clientId).subscribe((res)=>this.requestedEvents = res)
  }
}
