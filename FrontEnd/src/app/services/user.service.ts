import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/users';  // Backend API URL

  constructor(private http: HttpClient) {}

  // Fetch all users
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  // Add a new user
  addUser(userData: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, userData);
  }

  // Update an existing user
  updateUser(userId: string, updatedData: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}`, updatedData);
  }

  // Delete a user
  deleteUser(userId: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${userId}`);
  }

  // Change user role
  changeRole(userId: string, newRole: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${userId}/role`, { role: newRole });
  }
}
