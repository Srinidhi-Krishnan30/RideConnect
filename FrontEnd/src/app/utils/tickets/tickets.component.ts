import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgIf,NgFor } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [NgIf,NgFor],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.css'
})
export class TicketsComponent {
  tickets: any[] = [];
  isLoading = true;
  error: string | null = null;

  constructor(private http: HttpClient) {
    // Direct API call in the constructor
    this.http.get<any[]>('http://localhost:3000/admin/api/tickets').subscribe({
      next: (data) => {
        this.tickets = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Error fetching tickets:', err);
        this.error = 'Failed to load tickets';
        this.isLoading = false;
      }
    });
  }
  resolveTicket(ticket: any) {
    ticket.Status = 'Closed';
  }

}
