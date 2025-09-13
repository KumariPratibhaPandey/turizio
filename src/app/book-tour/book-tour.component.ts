import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common'; 
import { BookingService } from '../services/booking.service';
import { INDIA_STATES } from '../../data/destinations-data';

@Component({
  selector: 'app-book-tour',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './book-tour.html',
  styleUrls: ['./book-tour.css']
})
export class BookTourComponent {
  bookingForm: FormGroup;
  destinations = INDIA_STATES.map(s => s.state);

  constructor(private fb: FormBuilder, private bookingService: BookingService) {
    this.bookingForm = this.fb.group({
      destination: ['', Validators.required],
      date: ['', Validators.required],
      people: [1, [Validators.required, Validators.min(1)]],
       name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]]
    });
  }

  get destination() { return this.bookingForm.get('destination'); }
  get date() { return this.bookingForm.get('date'); }
  get people() { return this.bookingForm.get('people'); }
  get name() { return this.bookingForm.get('name'); }
  get email() { return this.bookingForm.get('email'); }

  onSubmit() {
    if (this.bookingForm.valid) {
      this.bookingService.addBooking(this.bookingForm.value).subscribe({
        next: (res) => {
          console.log('Booking saved:', res);
          alert('Booking successful!');
          this.bookingForm.reset();
        },
        error: (err) => {
          console.error('Booking failed:', err);
           alert('Booking failed. Please try again.');
        }
      });
    }
  }
}