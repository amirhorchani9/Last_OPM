import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent {
  isSigningUp: boolean = false;
  technicianForm: FormGroup;
  selectedFile: File | null = null;
  fileError: boolean = false;

  constructor(private fb: FormBuilder, private apiService: AuthService, private router: Router) {
    this.technicianForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    });
  }


  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      this.fileError = false;
    }
  }

  signUp(): void {
    if (this.isSigningUp) return;

    if (this.technicianForm.valid && this.selectedFile) {
      if (this.technicianForm.value.password !== this.technicianForm.value.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Passwords do not match',
          text: 'Please make sure both passwords match.',
        });
        return;
      }

      const formData = new FormData();
      formData.append('firstName', this.technicianForm.value.firstName);
      formData.append('lastName', this.technicianForm.value.lastName);
      formData.append('birthDate', this.technicianForm.value.birthDate);
      formData.append('email', this.technicianForm.value.email);
      formData.append('password', this.technicianForm.value.password);
      formData.append('authority', 'technician');
      formData.append('files', this.selectedFile);

      this.isSigningUp = true;

      this.apiService.signup(formData).subscribe(
        response => {
          this.isSigningUp = false;
          Swal.fire({
            icon: 'success',
            title: 'Account Created',
            text: 'Technician account created successfully.',
          }).then(() => {
            this.router.navigate(['/auth/signin']);
          });
        },
        error => {
          this.isSigningUp = false;
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error.message || 'An error occurred while creating the account.',
          });
        }
      );
    } else {
      this.technicianForm.markAllAsTouched();
      this.fileError = !this.selectedFile;
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete Form',
        text: 'Please fill in all required fields.',
      });
    }
  }
}
