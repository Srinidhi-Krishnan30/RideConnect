import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormsModule } from '@angular/forms'; 
import { BookingService } from '../../services/booking.service';
import { CommonModule } from '@angular/common';

export interface Vehicle {
  VehicleId: string;
  Model: string;
  Make: string;
  Year: number;
  PricePerDay: number;
  AvailabilityStatus: string;
  Specifications: Record<string, string>;
  ImageUrl: string;
}

@Component({
  selector: 'app-vehicle-search',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.css'],
  
})

export class VehicleSearchComponent implements OnInit {
  vehicles: Vehicle[] = [];  // Explicitly typed as an array of Vehicle objects
  filteredVehicles: Vehicle[] = [];  // Explicitly typed as an array of Vehicle objects
  searchTerm: string = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    // Fetch vehicles data on component initialization
    this.bookingService.getVehicles().subscribe(
      (data: Vehicle[]) => {  // Type the response data as an array of Vehicle objects
        this.vehicles = data;
        this.filteredVehicles = data;  // Initially display all vehicles
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

  filterVehicles(): void {
    // Filter vehicles based on the search term
    if (!this.searchTerm) {
      this.filteredVehicles = this.vehicles;
    } else {
      this.filteredVehicles = this.vehicles.filter(vehicle =>
        vehicle.Model.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
