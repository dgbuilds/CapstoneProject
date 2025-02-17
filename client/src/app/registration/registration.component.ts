import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { faCalendar, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent {
  faCalendar = faCalendar;
  faEye = faEye;
  faEyeSlash = faEyeSlash;
  itemForm: FormGroup;
  errorMessage: string = '';
  showPassword: boolean = false;
  showConfirmPassword: boolean = false;
  passwordStrength: string = '';

  constructor(private fb: FormBuilder, private httpService: HttpService, private router: Router) {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required, Validators.pattern(/^[A-Za-z0-9.' '_]{2,20}$/), Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[._!@#$%^&*])[A-Za-z0-9._!@#$%^&*]{8,20}$/),
        Validators.min(8)
      ]],
      confirmPassword: ['', [Validators.required]],
      role: ['', [Validators.required]]
    }, { validator: this.passwordMatchValidator });

    // Monitor password changes for strength
    this.itemForm.get('password')?.valueChanges.subscribe(password => {
      this.checkPasswordStrength(password);
    });
  }

  passwordMatchValidator(g: FormGroup) {
    return g.get('password')?.value === g.get('confirmPassword')?.value
      ? null : { 'mismatch': true };
  }

  checkPasswordStrength(password: string) {
    let strength = 0;

    // Length check
    if (password.length >= 8) strength += 1;

    // Contains uppercase
    if (/[A-Z]/.test(password)) strength += 1;

    // Contains lowercase
    if (/[a-z]/.test(password)) strength += 1;

    // Contains number
    if (/[0-9]/.test(password)) strength += 1;

    // Contains special char
    if (/[^A-Za-z0-9]/.test(password)) strength += 1;

    switch (strength) {
      case 0:
      case 1:
        this.passwordStrength = 'weak';
        break;
      case 2:
      case 3:
        this.passwordStrength = 'medium';
        break;
      case 4:
      case 5:
        this.passwordStrength = 'strong';
        break;
      default:
        this.passwordStrength = '';
    }
  }

  togglePasswordVisibility(field: 'password' | 'confirmPassword') {
    if (field === 'password') {
      this.showPassword = !this.showPassword;
    } else {
      this.showConfirmPassword = !this.showConfirmPassword;
    }
  }

  onSubmit() {
    if (this.itemForm.valid) {
      const formData = { ...this.itemForm.value };
      delete formData.confirmPassword; // Remove confirm password before sending

      this.httpService.registerUser(formData).subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: () => {
          this.errorMessage = "Registration failed. Please try again.";
        }
      });
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }
}
