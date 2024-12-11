// 1. Imports and config
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
  private baseUrl: string = 'http://localhost:3000';
  vehicles: any[] = [];

  constructor(private http: HttpClient, private router: Router) {}

  // 2 .Adding a vehicle
  addVehicle() {
    const vehicleData = {};
    
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

  // 3. Method for handling "Edit Vehicle" button click
  editVehicle() {
    const vehicleId = 1;
    const updatedVehicleData = {
      name: 'Updated Vehicle',
      type: 'SUV',
      year: 2023,
      model: 'ABC',
    };

    this.http.put(`${this.baseUrl}/vehicles/${vehicleId}`, updatedVehicleData).subscribe({
      next: (response: any) => {
        console.log('Vehicle updated successfully', response);
        alert('Vehicle updated successfully!');
      },
      error: (error: any) => {
        console.error('Failed to edit vehicle', error);
        alert('Failed to edit vehicle');
      }
    });
  }

  // 4. Method for handling "View Vehicles" button click
  viewVehicles() {
    this.http.get(`${this.baseUrl}/admin/api/vehicles`).subscribe({
      next: (response: any) => {
        this.vehicles = response;  
        console.log('Vehicles fetched successfully', this.vehicles); 
      },
      error: (error: any) => {
        console.error('Failed to fetch vehicles', error);  
        alert('Failed to fetch vehicles'); 
      }
    });
  }

  // 5. Method for handling "Remove Vehicle" button click
  removeVehicle() {
    const vehicleId = 1; 

    this.http.delete(`${this.baseUrl}/vehicles/${vehicleId}`).subscribe({
      next: (response: any) => {
        console.log('Vehicle removed successfully', response);
        alert('Vehicle removed successfully!');
      },
      error: (error: any) => {
        console.error('Failed to remove vehicle', error);
        alert('Failed to remove vehicle');
      }
    });
  }
}

