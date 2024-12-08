import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';  // Adjust path if necessary
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-booking',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.css'],
})
export class BookingComponent implements OnInit {
  // Variables for booking form
  selectedVehicle: any = null;  // Initialize to null
  pickupDate: string = '';
  returnDate: string = '';
  vehicles: any[] = [];  // Array to hold vehicles
  bookings: any[] = [];

  constructor(private bookingService: BookingService) {}  // Inject the BookingService

  ngOnInit(): void {
    this.fetchVehicles();  // Fetch vehicles on component initialization
  }

  // Fetch vehicles using the service
  fetchVehicles(): void {
    this.bookingService.getVehicles().subscribe(
      (data) => {
        this.vehicles = data;  // Update the vehicles array with the response
      },
      (error) => {
        console.error('Error fetching vehicles:', error);  // Handle error
      }
    );
  }

  // Calculate price based on vehicle and dates
  calculatePrice(): number {
    if (!this.selectedVehicle || !this.pickupDate || !this.returnDate) {
      return 0;
    }

    const pickup = new Date(this.pickupDate);
    const returnDate = new Date(this.returnDate);

    if (isNaN(pickup.getTime()) || isNaN(returnDate.getTime())) {
      console.error('Invalid date format');
      return 0;
    }

    const timeDifference = returnDate.getTime() - pickup.getTime();
    const days = timeDifference / (1000 * 3600 * 24);

    if (days <= 0) {
      console.error('Invalid date range');
      return 0;
    }

    return days * this.selectedVehicle.PricePerDay;
  }

  // Confirm booking and send data to backend
  confirmBooking(): void {
    if (!this.selectedVehicle || !this.pickupDate || !this.returnDate) {
      alert('Please complete all fields!');
      return;
    }
  
    const bookingData = {
      vehicle: {name: this.selectedVehicle.Make + " "+ this.selectedVehicle.Model },
      pickupDate: this.pickupDate,
      returnDate: this.returnDate,
      totalPrice: this.calculatePrice(),
      status: 'Confirmed', // Default status for new bookings
    };
  
    // Add the new booking to the `bookings` array
    this.bookings.push({
      ...bookingData,
      id: Date.now(), // Use a unique ID for frontend purposes
    });
  
    alert('Booking confirmed!');
  }
  
  

  // Cancel a booking
  cancelBooking(id: number): void {
    const booking = this.bookings.find((b) => b.id === id);
    if (booking) {
      booking.status = 'Cancelled';
      alert(`Booking for ${booking.vehicle.name} has been cancelled.`);
    }
  }
}
