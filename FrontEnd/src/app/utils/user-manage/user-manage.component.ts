import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-user-manage',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './user-manage.component.html',
  styleUrls: ['./user-manage.component.css']
})
export class UserManagementComponent implements OnInit {
  users: any[] = [];
  newUser = {
    username: '',
    email: '',
    password: '',  
    role: 'user'
  };
  apiUrl = 'http://localhost:3000/admin/api/users';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<any[]>(this.apiUrl).subscribe({
      next: (data) => {
        this.users = data;
      },
      error: (error) => {
        console.error('Failed to fetch users:', error);
        alert('Error fetching user data');
      }
    });
  }

  addNewUser(): void {
    this.http.post(this.apiUrl, this.newUser).subscribe({
      next: () => {
        alert('User added successfully');
        this.newUser = { username: '', email: '', password: '', role: 'user' }; // Reset form
        this.fetchUsers(); // Refresh user list
      },
      error: (error) => {
        console.error('Failed to add user:', error);
        alert('Error adding user');
      }
    });
  }

  // 3. changing the role of a user
  changeUserRole(username: string, newRole: string): void {
    
    const payload = { username, newRole };
  
    this.http.put(this.apiUrl, payload).subscribe({
      next: (response) => {
        console.log('Role changed successfully', response);
        this.fetchUsers();  // Refresh the user list to reflect the updated role
      },
      error: (error) => {
        console.error('Failed to change role:', error);
        alert('Error changing user role');
      }
    });
  }

  // 4. Delete a user
  deleteUser(username: string): void {
   
    const payload = { username };
    const deleteUrl = `http://localhost:3000/admin/api/users/${username}`;  // Correct endpoint with username
  
    this.http.delete(deleteUrl).subscribe({
      next: () => {
        alert('User deleted successfully');
        this.fetchUsers();  // Refresh the user list
      },
      error: (error) => {
        console.error('Failed to delete user:', error);
        alert('Error deleting user');
      }
    });
  }
}  
