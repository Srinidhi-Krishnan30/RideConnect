import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
//import { environment } from '../../environments/environment';  

@Injectable({
  providedIn: 'root',
})
export class BookingService {
  private baseUrl: string = 'http://localhost:3000/user/api';

  constructor(private http: HttpClient) {}

  // Fetch list of available vehicles
  getVehicles(): Observable<any[]> {
    const vehiclesUrl = `${this.baseUrl}/vehicles`;
    return this.http.get<any[]>(vehiclesUrl);
  }

  // Post a booking
  createBooking(bookingData: any): Observable<any> {
    const bookingsUrl = `${this.baseUrl}/bookings`;
    return this.http.post<any>(bookingsUrl, bookingData);
  }
}
