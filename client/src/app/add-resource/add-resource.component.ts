// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { HttpService } from '../../services/http.service';
// import { AuthService } from '../../services/auth.service';
 
// @Component({
//   selector: 'app-add-resource',
//   templateUrl: './add-resource.component.html',
//   styleUrls: ['./add-resource.component.scss']
// })

// export class AddResourceComponent implements OnInit {
//     itemForm: FormGroup;
//     errorMessage: string = '';
//     resources: any[] = [];
//     constructor(private httpService: HttpService, private router: Router, private fb:FormBuilder){
//         this.itemForm = this.fb.group({
//             name: ['', Validators.required],
//             type: ['', Validators.required],
//             availability: [null,Validators.required]
//         });
//     }
//     ngOnInit(): void {
//         this.getResources();
//     }
 
//     getResources(){
//         this.httpService.GetAllResources().subscribe((res:any[])=>
//         this.resources = res);
//     }
 
//     onRadioChange(selectedValue: string) {
//         if (selectedValue === 'availability') {
//           this.itemForm.get('availability')?.setValue(true);
//           document.getElementById('unavailability')?.setAttribute('disabled', 'true');
//           document.getElementById('availability')?.removeAttribute('disabled');
//         } else if (selectedValue === 'unavailability') {
//           this.itemForm.get('availability')?.setValue(false);
//           document.getElementById('availability')?.setAttribute('disabled', 'true');
//           document.getElementById('unavailability')?.removeAttribute('disabled');
//         }
//     }
 
//     onSubmit(): void{
//         if(this.itemForm.valid){
//             this.httpService.addResource(this.itemForm.value).subscribe(()=>
//             this.router.navigate(['/dashboard']))
//         }else{
//             this.errorMessage = "Form is invalid";
//         }
//     }
// }
 
 
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpService } from '../../services/http.service';
import { 
  faBox, 
  faTag, 
  faExclamationCircle, 
  faCheckCircle, 
  faTimesCircle, 
  faPlus,
  faCalendar,
  faSignOutAlt
} from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  // Icons
  faBox = faBox;
  faTag = faTag;
  faExclamationCircle = faExclamationCircle;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faPlus = faPlus;
  faCalendar = faCalendar;
  faSignOutAlt = faSignOutAlt;
  itemForm: FormGroup;
  resources: any[] = [];
  isSubmitting = false;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private router: Router,
    private authService: AuthService
  ) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required, Validators.minLength(2)]],
      availability: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.loadResources();
  }

  loadResources(): void {
    this.httpService.GetAllResources().subscribe({
      next: (res) => {
        this.resources = res;
      },
      error: (error) => {
        console.error('Error loading resources:', error);
      }
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      
      this.httpService.addResource(this.itemForm.value).subscribe({
        next: () => {
          this.loadResources();
          this.itemForm.reset();
          this.isSubmitting = false;
        },
        error: (error) => {
          console.error('Error adding resource:', error);
          this.isSubmitting = false;
        },
        complete: () => {
          this.isSubmitting = false;
        }
      });
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
