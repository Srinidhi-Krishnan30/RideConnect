import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Import CommonModule

@Component({
  selector: 'app-review',
  standalone: true,
  imports:[FormsModule, CommonModule],
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.css'],
})
export class ReviewComponent {
  vehicles = [
    { name: 'Toyota Corolla' },
    { name: 'Ford Explorer' },
    { name: 'Honda Civic' },
  ];

  reviews = [
    {
      vehicle: { name: 'Toyota Corolla' },
      rating: 4,
      text: 'Great car, comfortable and fuel-efficient.',
    },
    {
      vehicle: { name: 'Ford Explorer' },
      rating: 5,
      text: 'Excellent SUV, perfect for family trips.',
    },
  ];

  selectedVehicle: any;
  rating: number = 0;
  reviewText: string = '';

  submitReview() {
    if (this.selectedVehicle && this.rating && this.reviewText) {
      const newReview = {
        vehicle: this.selectedVehicle,
        rating: this.rating,
        text: this.reviewText,
      };
      this.reviews.push(newReview);

      // Reset form fields
      this.selectedVehicle = null;
      this.rating = 0;
      this.reviewText = '';
      alert('Review submitted successfully!');
    } else {
      alert('Please fill in all fields.');
    }
  }
}
