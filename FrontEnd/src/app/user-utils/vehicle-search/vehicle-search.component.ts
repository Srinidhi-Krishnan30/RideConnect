// 1. Imports and config
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
  vehicles: Vehicle[] = [];
  filteredVehicles: Vehicle[] = []; 
  searchTerm: string = '';

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
   
    this.bookingService.getVehicles().subscribe(
      (data: Vehicle[]) => {  
        this.vehicles = data;
        this.filteredVehicles = data;  
      },
      (error) => {
        console.error('Error fetching vehicles:', error);
      }
    );
  }

    // 2. Filtering vehicles based on given search criteria
  filterVehicles(): void {
    if (!this.searchTerm) {
      this.filteredVehicles = this.vehicles;
    } else {
      this.filteredVehicles = this.vehicles.filter(vehicle =>
        vehicle.Model.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
