
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from '../../environments/environment';

export interface Vehicle {
    _id?: string;
    RegistrationNumber: string;
    Make: string;
    Model: string;
    Year: number;
    PricePerDay: number;
    AvailabilityStatus: 'Available' | 'Unavailable' | 'In Maintenance';
  }

@Injectable({
    providedIn: 'root'
  })
  export class VehicleService {
    private apiUrl = `${environment.apiUrl}/vehicles`; 
  
    // Configure HTTP headers
    private httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
      })
    };
  
    constructor(private http: HttpClient) {}
  
    // Get all vehicles with error handling
    getVehicles(): Observable<Vehicle[]> {
      return this.http.get<Vehicle[]>(this.apiUrl, this.httpOptions)
        .pipe(
          retry(1),
          catchError(this.handleError)
        );
    }
  
    // Get a single vehicle by ID
    getVehicleById(vehicleId: string): Observable<Vehicle> {
      return this.http.get<Vehicle>(`${this.apiUrl}/${vehicleId}`, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    // Create a new vehicle with type safety and error handling
    createVehicle(vehicle: Vehicle): Observable<Vehicle> {
      return this.http.post<Vehicle>(this.apiUrl, vehicle, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
    
    // Update an existing vehicle with type safety and error handling
    updateVehicle(vehicleId: string, updatedVehicle: Vehicle): Observable<Vehicle> {
      return this.http.put<Vehicle>(`${this.apiUrl}/${vehicleId}`, updatedVehicle, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
    
    // Delete a vehicle
    deleteVehicle(vehicleId: string): Observable<any> {
      return this.http.delete<any>(`${this.apiUrl}/${vehicleId}`, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
    
    // Search vehicles by query
    searchVehicles(query: string): Observable<Vehicle[]> {
      return this.http.get<Vehicle[]>(`${this.apiUrl}/search?query=${query}`, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    // Get vehicles by availability status
    getVehiclesByStatus(status: string): Observable<Vehicle[]> {
      return this.http.get<Vehicle[]>(`${this.apiUrl}/status/${status}`, this.httpOptions)
        .pipe(
          catchError(this.handleError)
        );
    }
  
    // Error handling method
    private handleError(error: any) {
      console.error('An error occurred:', error);
      
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
        // Client-side error
        errorMessage = `Error: ${error.error.message}`;
      } else {
        // Server-side error
        errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      
      return throwError(() => new Error(errorMessage));
    }
  }