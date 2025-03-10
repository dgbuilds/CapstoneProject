import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import {
  faBoxes,
  faSignOutAlt,
  faDashboard,
  faCalendarAlt,
  faBox,
  faHashtag,
  faExclamationCircle,
  faCheckCircle,
  faSave,
  faCalendar
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-resource-allocate',
  templateUrl: './resource-allocate.component.html',
  styleUrls: ['./resource-allocate.component.scss']
})
export class ResourceAllocateComponent implements OnInit {
  // Icons
  faCalendar = faCalendar;
  faSignOutAlt = faSignOutAlt;
  faDashboard = faDashboard;
  faCalendarAlt = faCalendarAlt;
  faBox = faBox;
  faHashtag = faHashtag;
  faExclamationCircle = faExclamationCircle;
  faCheckCircle = faCheckCircle;
  faSave = faSave;

  itemForm!: FormGroup;
  events: any[] = [];
  resources: any[] = [];
  errorMessage: string = '';
  successMessage: string = '';

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
    this.loadResources();
  }

  private initializeForm(): void {
    this.itemForm = this.fb.group({
      eventId: ['', Validators.required],
      resourceId: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(1)]]
    });
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.itemForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  loadEvents(): void {
    this.httpService.GetAllevents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: () => {
        this.errorMessage = 'Failed to load events.';
      }
    });
  }

  loadResources(): void {
    this.httpService.GetAllResources().subscribe({
      next: (resources) => {
        this.resources = resources;
      },
      error: () => {
        this.errorMessage = 'Failed to load resources';
      }
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      const { eventId, resourceId, quantity } = this.itemForm.value;
      
      this.httpService.allocateResources(eventId, resourceId, { quantity }).subscribe({
        next: () => {
          this.successMessage = 'Resource allocated successfully';
          this.itemForm.reset();
          setTimeout(() => {
            this.successMessage = '';
            this.router.navigate(["/dashboard"]);
          }, 2000);
        },
        error: () => {
          this.errorMessage = 'Failed to allocate resource';
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  navigateToDashboard() : void {
    this.router.navigate(['/dashboard']);
  }
}
