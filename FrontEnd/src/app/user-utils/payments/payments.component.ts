import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; // Import CommonModule

@Component({
  selector: 'app-payments',
  standalone: true,
  imports:[CommonModule],
  templateUrl: './payments.component.html',
  styleUrls: ['./payments.component.css'],
})
export class PaymentsComponent {
  payments = [
    {
      id: 1,
      booking: { vehicle: { name: 'Toyota Corolla' } },
      amount: 500,
      method: 'Credit Card',
      date: '2024-12-10',
      status: 'Completed',
    },
    {
      id: 2,
      booking: { vehicle: { name: 'Ford Explorer' } },
      amount: 750,
      method: 'PayPal',
      date: '2024-12-15',
      status: 'Pending',
    },
    {
      id: 3,
      booking: { vehicle: { name: 'Honda Civic' } },
      amount: 400,
      method: 'Debit Card',
      date: '2024-12-05',
      status: 'Failed',
    },
  ];

  retryPayment(id: number) {
    const payment = this.payments.find((p) => p.id === id);
    if (payment) {
      payment.status = 'Pending'; // Reset to pending status
      alert(`Payment for ${payment.booking.vehicle.name} is now pending.`);
    }
  }
}
