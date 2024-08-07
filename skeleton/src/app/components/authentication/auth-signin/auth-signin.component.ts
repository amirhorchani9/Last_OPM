import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent {
  isLoggingIn: boolean = false;
  form: FormGroup;

  constructor(private apiService: AuthService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn(): void {
    if (this.isLoggingIn) return;
    if (this.form.valid) {
      this.isLoggingIn = true;

      this.apiService.login(this.form.value).subscribe(response => {
        sessionStorage.setItem('accessToken', response.accessToken);
        sessionStorage.setItem('refreshToken', response.refreshToken);
        sessionStorage.setItem('_id', response.payload.user._id);
        sessionStorage.setItem('authority', response.payload.user.authority);
        
        this.router.navigate(['/sample-page']);
      }, error => {
        this.isLoggingIn = false;
        console.error('Error logging in:', error);
        Swal.fire({
          icon: 'error',
          title: 'Login Failed',
          text: error.error.message || 'Invalid email or password. Please try again.',
        });
      });
    } else {
      this.form.markAllAsTouched();
      alert('Please enter all fields.');
    }
  }
}
