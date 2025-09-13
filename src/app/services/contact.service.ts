import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  private apiUrl = 'https://example.com/api/contact'; // Replace with real API later

  constructor(private http: HttpClient) {}

  sendMessage(data: any): Observable<any> {
    console.log('📩 Contact form data:', data);
    return of({ success: true }); // Simulated success

    // For real backend:
    // return this.http.post(this.apiUrl, data);
  }
}
