import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-vehicle-manage',
  standalone: true,
  imports: [ HttpClientModule,RouterModule,NgFor,NgIf],
  templateUrl: './vehicle-manage.component.html',
  styleUrl: './vehicle-manage.component.css'
})

export class VehicleManagementComponent {
  private baseUrl: string = 'http://localhost:3000'; // Base URL for API
  vehicles: any[] = []; // Store vehicles data (for viewing)

  constructor(private http: HttpClient, private router: Router) {}

  // Method for handling "Add Vehicle" button click
  addVehicle() {
    const vehicleData = { 
      // Example data - You can replace with actual form values
      
    };
    
    this.http.post(`${this.baseUrl}/vehicles`, vehicleData).subscribe({
      next: (response: any) => {
        console.log('Vehicle added successfully', response);
        alert('Vehicle added successfully!');
        
      },
      error: (error: any) => {
        console.error('Failed to add vehicle', error);
        alert('Failed to add vehicle');
      }
    });
  }

  // Method for handling "Edit Vehicle" button click
  editVehicle() {
    const vehicleId = 1; // Example ID (replace with actual selected vehicle ID)
    const updatedVehicleData = {
      name: 'Updated Vehicle',
      type: 'SUV',
      year: 2023,
      model: 'ABC',
      // Add other updated properties
    };

    this.http.put(`${this.baseUrl}/vehicles/${vehicleId}`, updatedVehicleData).subscribe({
      next: (response: any) => {
        console.log('Vehicle updated successfully', response);
        alert('Vehicle updated successfully!');
        // Refresh the vehicle list or redirect
      },
      error: (error: any) => {
        console.error('Failed to edit vehicle', error);
        alert('Failed to edit vehicle');
      }
    });
  }

  // Method for handling "View Vehicles" button click
  viewVehicles() {
    this.http.get(`${this.baseUrl}/admin/api/vehicles`).subscribe({
      next: (response: any) => {
        this.vehicles = response;  // Store the fetched vehicles
        console.log('Vehicles fetched successfully', this.vehicles);  // Log the fetched data
        // You can display the vehicles in the template
      },
      error: (error: any) => {
        console.error('Failed to fetch vehicles', error);  // Log any errors
        alert('Failed to fetch vehicles');  // Show alert on error
      }
    });
  }

  // Method for handling "Remove Vehicle" button click
  removeVehicle() {
    const vehicleId = 1; // Example ID (replace with actual selected vehicle ID)

    this.http.delete(`${this.baseUrl}/vehicles/${vehicleId}`).subscribe({
      next: (response: any) => {
        console.log('Vehicle removed successfully', response);
        alert('Vehicle removed successfully!');
        // Refresh the vehicle list or redirect
      },
      error: (error: any) => {
        console.error('Failed to remove vehicle', error);
        alert('Failed to remove vehicle');
      }
    });
  }
}

