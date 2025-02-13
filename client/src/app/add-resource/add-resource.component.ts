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
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { 
  faExclamationCircle, 
  faCheckCircle, 
  faTimesCircle, 
  faPlus 
} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-add-resource',
  templateUrl: './add-resource.component.html',
  styleUrls: ['./add-resource.component.scss']
})
export class AddResourceComponent implements OnInit {
  // Icons
  faExclamationCircle = faExclamationCircle;
  faCheckCircle = faCheckCircle;
  faTimesCircle = faTimesCircle;
  faPlus = faPlus;

  itemForm: FormGroup;
  errorMessage: string = '';
  resources: any[] = [];
  isSubmitting = false;

  constructor(
    private httpService: HttpService, 
    private router: Router, 
    private fb: FormBuilder
  ) {
    this.itemForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      type: ['', [Validators.required, Validators.minLength(2)]],
      availability: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getResources();
  }

  getResources() {
    this.httpService.GetAllResources().subscribe({
      next: (res: any[]) => {
        this.resources = res;
      },
      error: (error) => {
        console.error('Error fetching resources:', error);
      }
    });
  }

  onRadioChange(selectedValue: string) {
    const availabilityControl = this.itemForm.get('availability');
    if (selectedValue === 'availability') {
      availabilityControl?.setValue(true);
    } else if (selectedValue === 'unavailability') {
      availabilityControl?.setValue(false);
    }
  }

  onSubmit(): void {
    if (this.itemForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      this.httpService.addResource(this.itemForm.value).subscribe({
        next: () => {
          this.getResources();
          this.itemForm.reset();
          this.isSubmitting = false;
          // You can add a success toast notification here
        },
        error: (error) => {
          console.error('Error adding resource:', error);
          this.errorMessage = "Failed to add resource";
          this.isSubmitting = false;
          // You can add an error toast notification here
        }
      });
    }
  }
}
