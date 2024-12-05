import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-pass-recover',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './pass-recover.component.html',
  styleUrl: './pass-recover.component.scss'
})
export class PassRecoverComponent {
  loginData = {
    username: '',
    password: '',
    password2: '',
    rememberMe: false
  };

  errorMessage = '';

  onSubmit() {
    // Here you would typically make an API call to authenticate the user
    // For demo purposes, we'll just show a mock error message
    if (this.loginData.username !== 'admin' || this.loginData.password !== 'password') {
      this.errorMessage = 'Invalid username or password';
      return;
    }
    
    console.log('Login successful', this.loginData);
    this.errorMessage = '';
  }
}
