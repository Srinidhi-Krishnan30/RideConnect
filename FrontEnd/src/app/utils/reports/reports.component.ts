import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgModel } from '@angular/forms';
import { NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-reports',
  standalone: true,
  imports: [FormsModule,NgFor],
  templateUrl: './reports.component.html',
  styleUrl: './reports.component.css'
})
export class ReportsComponent{
  modelNumber: string = '';
  reports: any[] = [];
  make: string = '';
  comments: string = '';

  constructor(private http: HttpClient) {}

  fetchReports() {
    this.http.get<any[]>('http://localhost:3000/admin/api/reports').subscribe(
      (data) => {
        this.reports = data; // Store the response data in the reports array
      },
      (error) => {
        console.error('Error fetching reports', error); // Log error if any
      }
    );
    console.log(this.reports);
  }

  // Function to submit the report
  submitReport(): void {
    const reportData = {
      modelNumber: this.modelNumber,
      make: this.make,
      comments: this.comments
    };

    const apiUrl = 'http://localhost:3000/admin/api/reports';

    this.http.post(apiUrl, reportData).subscribe(
      (response) => {
        console.log('Report submitted successfully:', response);
        alert('Report submitted successfully!');
      },
      (error) => {
        console.error('Error submitting report:', error);
        alert('Error submitting report!');
      }
    );
    this.fetchReports();
  }
  

}
