import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  registrationForm: FormGroup;
  showSuccess = false;

  constructor(
    private fb: FormBuilder,
    private _userService: UserService
  
  ) {
    this.registrationForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      fullName: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', [Validators.required]],
      terms: [false, [Validators.requiredTrue]],
    }, {
      validators: this.passwordMatchValidator
    });
  }

  passwordMatchValidator(group: FormGroup) {
    const password = group.get('password')?.value;
    const confirmPassword = group.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.registrationForm.get(fieldName);
    return field ? (field.invalid && (field.dirty || field.touched)) : false;
  }

  getEmailErrorMessage(): string {
    const email = this.registrationForm.get('email');
    if (email?.hasError('required')) {
      return 'Email is required';
    }
    return email?.hasError('email') ? 'Please enter a valid email address' : '';
  }

  onSubmit() {

    let user = {
      name: this.registrationForm.get("fullName")?.value,
      email: this.registrationForm.get("email")?.value,
      password: this.registrationForm.get("password")?.value,
    }
    
    this._userService.register(user).subscribe({
      next: (response: any) => {
        if (parseInt(response.status) === 200) {
          if (this.registrationForm.valid) {
            console.log('Form submitted:', this.registrationForm.value);
            this.showSuccess = true;
            setTimeout(() => {
              this.showSuccess = false;
            }, 3000);
            this.registrationForm.reset();
          } else {
            Object.keys(this.registrationForm.controls).forEach(key => {
              const control = this.registrationForm.get(key);
              if (control?.invalid) {
                control.markAsTouched();
              }
            });
          }
        }
      },
      error: (err) => {
        console.error('Error during registration:', err);
        // Aquí puedes agregar un mensaje de error o alguna acción en caso de fallo
      }
    });

    
  }
}
