// 1. Imports and config
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-support-ticket',
  standalone: true,
  imports: [FormsModule, CommonModule], 
  templateUrl: './support-ticket.component.html',
  styleUrls: ['./support-ticket.component.css'],
})
export class SupportTicketComponent {
  vehicles = [
    { name: 'Toyota Corolla' },
    { name: 'Ford Explorer' },
    { name: 'Honda Civic' },
  ];

  tickets = [
    {
      vehicle: { name: 'Toyota Corolla' },
      description: 'Issue with the engine noise.',
      status: 'In Progress',
    },
    {
      vehicle: { name: 'Ford Explorer' },
      description: 'Flat tire during the trip.',
      status: 'Pending',
    },
  ];

  selectedVehicle: any;
  ticketDescription: string = '';

  // 2. Submit a ticket

  submitTicket() {
    if (this.selectedVehicle && this.ticketDescription) {
      const newTicket = {
        vehicle: this.selectedVehicle,
        description: this.ticketDescription,
        status: 'Pending',
      };
      this.tickets.push(newTicket);

      this.selectedVehicle = null;
      this.ticketDescription = '';
      alert('Ticket submitted successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  }
}
