import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { 
  faCalendar,
  faSignOutAlt,
  faDashboard,
  faTag,
  faFileAlt,
  faClock,
  faMapMarkerAlt,
  faFlag,
  faEdit,
  faSave,
  faTimes,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-update-event',
  templateUrl: './update-event.component.html',
  styleUrls: ['./update-event.component.scss']
})
export class UpdateEventComponent implements OnInit {
  // Icons
  faCalendar = faCalendar;
  faSignOutAlt = faSignOutAlt;
  faDashboard = faDashboard;
  faTag = faTag;
  faFileAlt = faFileAlt;
  faClock = faClock;
  faMapMarkerAlt = faMapMarkerAlt;
  faFlag = faFlag;
  faEdit = faEdit;
  faSave = faSave;
  faTimes = faTimes;
  faCheckCircle = faCheckCircle;

  events: any[] = [];
  itemForm!: FormGroup;
  successMessage: string = '';
  update: boolean = true;
  eventId: any;
  errorMessage: string = '';

  constructor(
    private httpService: HttpService,
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.initializeForm();
  }

  ngOnInit(): void {
    this.loadEvents();
  }

  private initializeForm(): void {
    this.itemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      status: ['Pending', Validators.required]
    });
  }

  loadEvents(): void {
    this.httpService.GetAllevents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: () => {
        this.errorMessage = "Failed to Load Events";
      }
    });
  }

  updateEvent(): void {
    if (this.itemForm.valid) {
      this.httpService.updateEvent(this.eventId, this.itemForm.value).subscribe({
        next: () => {
          this.successMessage = "Event updated successfully";
          setTimeout(() => {
            this.successMessage = '';
            this.update = true;
            this.loadEvents();
          }, 2000);
        },
        error: () => {
          // Handle error
        }
      });
    }
  }

  selectedEvent(eventId: string): void {
    this.update = false;
    this.eventId = eventId;
    this.httpService.GetEventdetails(eventId).subscribe({
      next: (event) => {
        const formattedDateTime = this.formatDateTimeWithoutOffset(event.dateTime);
        const updatedEvent = { ...event , dateTime : formattedDateTime}
        this.itemForm.patchValue(updatedEvent);
      },
      error: () => {
        // Handle error
      }
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


  formatDateTimeWithoutOffset(dateTime: string): string {
    const date = new Date(dateTime);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
    return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}`;
  }

  navigateToDashboard() : void {
    this.router.navigate(['/dashboard']);
  }
  
}


