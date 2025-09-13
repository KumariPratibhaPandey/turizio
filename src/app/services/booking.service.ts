import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
// Assuming you have a Booking model. If not, create one.
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private bookings: Booking[] = [];

  constructor() { }

  addBooking(booking: Booking): Observable<Booking> {
    this.bookings.push(booking);
    console.log('Booking saved:', booking);
    return of(booking).pipe(delay(500)); // Simulate API delay
  }
}