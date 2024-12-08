import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';
import { NgIf } from '@angular/common';


// Import standalone components
import { BookingManageComponent } from '../utils/booking-manage/booking-manage.component';
import { VehicleManagementComponent } from '../utils/vehicle-manage/vehicle-manage.component';
import { UserManagementComponent } from '../utils/user-manage/user-manage.component';
import { PaymentsComponent } from '../utils/payments/payments.component';
import { ReportsComponent } from '../utils/reports/reports.component';
import { TicketsComponent } from '../utils/tickets/tickets.component';
import { DamageReportComponent } from '../utils/damage-report/damage-report.component';
import { FooterComponent } from '../utils/footer/footer.component';

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [
    NgIf,
    BookingManageComponent,
    VehicleManagementComponent,
    UserManagementComponent,
    PaymentsComponent,
    ReportsComponent,
    TicketsComponent,
    DamageReportComponent,
    FooterComponent
  ],
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent {
  data: any;

  constructor(private router: Router) {}

  logout() {
    console.log('Logging out...');
    localStorage.removeItem('token');
    this.router.navigate(['/']);
  }
}

