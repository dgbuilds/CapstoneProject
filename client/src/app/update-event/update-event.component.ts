// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';

// @Component({
//   selector: 'app-update-event',
//   templateUrl: './update-event.component.html',
//   styleUrls: ['./update-event.component.scss']
// })
// export class UpdateEventComponent implements OnInit {
//   events: any[] = [];
//   itemForm: FormGroup;
//   successMessage: string = '';
//   update:Boolean = true;
//   eventId:any;


//   constructor(private httpService: HttpService, private fb: FormBuilder, private router:Router) {
//     this.itemForm = this.fb.group({
//       title: ['', Validators.required],
//       description: ['', Validators.required],
//       dateTime: ['', Validators.required],
//       location: ['', Validators.required],
//       status: ['', Validators.required]
//     })
//   }

//   ngOnInit(): void {
//     this.httpService.GetAllevents().subscribe((res)=>this.events = res)
    
//   }

//   updateEvent() {
//     if (this.itemForm.valid) {
//       this.httpService.updateEvent(this.eventId, this.itemForm.value).subscribe({
//         next: () => {
//           this.successMessage = "Updated Successfully";
//           setTimeout(() => this.successMessage = '', 3000);
//           this.router.navigate(["/dashboard"])
//         }
//       })
//     }
//   }

//   selectedEvent(eventId:any){
//     this.update = !this.update;
//     this.eventId = eventId;
//     this.httpService.GetEventdetails(eventId).subscribe((res)=>this.itemForm.patchValue(res))
//   }

// }



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
      status: ['', Validators.required]
    });
  }

  loadEvents(): void {
    this.httpService.GetAllevents().subscribe({
      next: (events) => {
        this.events = events;
      },
      error: () => {
        // Handle error
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
        this.itemForm.patchValue(event);
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
}

