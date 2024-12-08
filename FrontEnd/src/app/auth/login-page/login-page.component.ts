import { Component,OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-login-page',
  standalone: true,
  imports: [FormsModule,CommonModule],
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
})
export class LoginPageComponent{
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  email: string = '';
  userId: string = '';  // You can generate this or let the user enter
  role: string = ''; // Default role
  isActive: boolean = true; // Default value
  isLogin: boolean = true;
  message: string = '';
  isLoggedIn: boolean = false;
  private baseUrl: string = 'http://localhost:3000/auth'; 

  constructor(private http:HttpClient,private router: Router,private cdr: ChangeDetectorRef) {}
  
  
  
  onSubmit() {
    if (this.isLogin) {
      this.login();
    } else {
      this.register();
    }
  }
  // FACILITATE LOGIN FEATURE
  private login() {
    
    this.http.post(`${this.baseUrl}/login`, { 
      username: this.username, 
      password: this.password,
    }).subscribe({
      // retrieve backend response
      next: (response: any) => {
        //console.log('Login successful', response);
        const token = response.token;  
        const role = response.user.role;   
        
        console.log(token);                                    //the session token is present in this place
        
       
      if (token) {
        localStorage.setItem('token', token);  // Store token in localStorage
      }
      
        this.isLoggedIn = true;
        this.role = role;
        this.cdr.detectChanges();

        alert(`Welcome, ${this.username}!`);
        

      if(this.role == "admin"){
        this.router.navigate(['/admin']); // Navigate to admin page
        }else{this.router.navigate(['/user']);}
      },

      error: (error: any) => {
        console.error('Login failed', error);
        this.cdr.detectChanges();
        this.message = 'Invalid credentials. Please try again.';
      }
    });
    
  }
    
  private register() {
    if (this.password !== this.confirmPassword) {
      this.message = 'Passwords do not match.';
      this.cdr.detectChanges();
      return;
    }

    this.http.post(`${this.baseUrl}/register`, { 
      username: this.username,
      email: this.email,
      userId: this.userId,
      role: this.role,
      password: this.password,
      isActive: this.isActive
    }).subscribe({
      next: (response: any) => {
        console.log('Registration successful', response);
        this.message = 'Registration successful! Redirecting to login page.';
        this.cdr.detectChanges();
        setTimeout(() => this.toggleForm(), 2000);
      },
      error: (error: any) => {
        console.error('Registration failed', error);
        this.message = 'Registration failed. Try again.';
        this.cdr.detectChanges();
      }
    });
}
logout() {
  localStorage.removeItem('token');  // Example if you use localStorage to store the token
  this.isLoggedIn = false;
  this.router.navigate(['/']);
}



toggleForm() {
  this.isLogin = !this.isLogin;
  this.message = '';
  this.username = '';
  this.password = '';
  this.confirmPassword = '';
  this.email = '';
  this.userId = '';
  this.role = '';
  this.isActive = true;
  this.isLoggedIn = false; 
}
  

}
