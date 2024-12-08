import { Component } from '@angular/core';
import { NgModule } from '@angular/core';import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';

//Component specific imports
import { VehicleSearchComponent } from '../user-utils/vehicle-search/vehicle-search.component';
import { BookingComponent } from '../user-utils/booking/booking.component';
import { PaymentsComponent } from '../user-utils/payments/payments.component';
import { ReviewComponent } from '../user-utils/review/review.component';
import { SupportTicketComponent } from '../user-utils/support-ticket/support-ticket.component';

@Component({
  selector: 'app-user-page',
  standalone: true,
  imports: [
    VehicleSearchComponent,
    BookingComponent,
    PaymentsComponent,
    ReviewComponent,
    SupportTicketComponent
  ],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css'
})
export class UserPageComponent {
  constructor(private router: Router) {}

  // Logout method
  logout() {
    console.log('Logging out...');
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    this.router.navigate(['/']);
  }
  

}




