import { Component,OnInit } from '@angular/core';
import { NgFor ,NgIf} from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NgClass } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-booking-manage',
  standalone: true,
  imports: [NgFor,NgClass,FormsModule,NgIf,DatePipe],
  templateUrl: './booking-manage.component.html',
  styleUrl: './booking-manage.component.css'
})
export class BookingManageComponent implements OnInit{
  isBookingFormVisible: boolean = false;  // Toggle visibility of the form
  newBooking: any = {
    VehicleName: '',
    PickupDate: '',
    ReturnDate: '',
    Status: 'Active'
  };
  bookings: any[] = [];

  constructor(private http: HttpClient) {}
  toggleBookingForm() {
    this.isBookingFormVisible = !this.isBookingFormVisible;
  }

  ngOnInit(): void {
    this.loadBookings();
    this.fetchBookings(); 
  }

  fetchBookings(): void {
    this.http.get<any[]>('http://localhost:3000/admin/api/bookings')
      .subscribe(
        (data) => {
          this.bookings = data;
        },
        (error) => {
          console.error('Error fetching bookings:', error);
        }
      );
      console.log(this.bookings);
    }
    onSubmitBooking() {
      console.log(this.newBooking);
      this.http.post('http://localhost:3000/admin/api/bookings', this.newBooking)
        .subscribe(response => {
          console.log('Booking Created:', response);
          // Optionally reset the form and update the booking list
          this.newBooking = { VehicleName: '', PickupDate: '', ReturnDate: '', Status: 'Active' };
          this.isBookingFormVisible = false;
          this.loadBookings(); // Reload bookings to include the new booking
        }, error => {
          console.error('Error creating booking:', error);
        });
    }
    cancelBooking(bookingToCancel : any) {
      // Remove the canceled booking from the list
      this.bookings = this.bookings.filter(booking => booking !== bookingToCancel);
  }
    loadBookings() {
      this.http.get('http://localhost:3000/admin/api/bookings')
        .subscribe((data: any) => {
          this.bookings = data;
        });
    }

   
}
