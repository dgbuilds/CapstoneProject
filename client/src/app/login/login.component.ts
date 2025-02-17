import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpService } from '../../services/http.service';
import { AuthService } from '../../services/auth.service';
import { faCalendar } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent {

  itemForm: FormGroup;
  errorMessage: string = '';
  faCalendar = faCalendar;

  constructor(
    private fb: FormBuilder,
    private httpService: HttpService,
    private authService: AuthService,
    private router: Router
  ) {
    this.itemForm = this.fb.group({
      username: ['', [Validators.required,Validators.pattern(/^[A-Za-z0-9.' '_]{2,20}$/),Validators.minLength(3)]],
      password: ['', [Validators.required]]
    });
  }

  onSubmit(): void {
    if (this.itemForm.valid) {
      this.httpService.Login(this.itemForm.value).subscribe({
        next: (response) => {
          localStorage.setItem("token", response.token);
          localStorage.setItem("role", response.roles);
          localStorage.setItem("user_id", response.userId);
          console.log(localStorage.getItem("user_id"));
          this.authService.saveToken(response.token);
          this.authService.setRole(response.role);
          this.authService.setUserID(response.userId);
          this.router.navigate(['/dashboard']);
        },
        error: (error) => {
          this.errorMessage = 'Login failed. Please check your credentials.';
        }
      });
    }
  }

  navigateToHome() {
    this.router.navigate(['/home']);
  }

}
