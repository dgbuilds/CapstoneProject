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

  navigateToDashboard(): void {
    this.router.navigate(['/dashboard']);
  }
}
