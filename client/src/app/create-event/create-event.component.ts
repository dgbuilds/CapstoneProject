// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';
 
// @Component({
//   selector: 'app-create-event',
//   templateUrl: './create-event.component.html',
//   styleUrls: ['./create-event.component.scss']
// })

// export class CreateEventComponent
// {
//   itemForm: FormGroup;
//   errorMessage: String= '';
//   constructor(
//     private fb:FormBuilder,
//     private httpService: HttpService,
//     private router:Router
//   ){
//     this.itemForm = this.fb.group({
//       title:['' , Validators.required],
//       description:['' , Validators.required],
//       dateTime:['' , Validators.required],
//       location:['' , Validators.required],
//       status:['PENDING' , Validators.required],
//     });
//   }
//   onSubmit():void{
//     console.log("create event button clicked");
//     console.log(this.itemForm.valid);
//     console.log(this.itemForm.value);
//     if(this.itemForm.valid){
//       this.httpService.createEvent(this.itemForm.value).subscribe({
//         next: () =>{
//         this.router.navigate(['/dashboard']);
//       },
//       error: (error) =>{
//         this.errorMessage = 'Failed to create event ,Please try again.' ;
//       }});
//     }
//   }

// }

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { 
  faCalendar,
  faSignOutAlt,
  faTag,
  faFileAlt,
  faClock,
  faMapMarkerAlt,
  faExclamationCircle,
  faSave
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-create-event',
  templateUrl: './create-event.component.html',
  styleUrls: ['./create-event.component.scss']
})
export class CreateEventComponent {
  // Icons
  faCalendar = faCalendar;
  faSignOutAlt = faSignOutAlt;
  faTag = faTag;
  faFileAlt = faFileAlt;
  faClock = faClock;
  faMapMarkerAlt = faMapMarkerAlt;
  faExclamationCircle = faExclamationCircle;
  faSave = faSave;

  itemForm: FormGroup;
  errorMessage: string = '';
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService
  ) {
    this.itemForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', [Validators.required, Validators.minLength(10)]],
      dateTime: ['', Validators.required],
      location: ['', Validators.required],
      status: ['PENDING']
    });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  onSubmit(): void {
    if (this.itemForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      this.httpService.createEvent(this.itemForm.value).subscribe({
        next: () => {
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'Failed to create event. Please try again.';
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }
}
