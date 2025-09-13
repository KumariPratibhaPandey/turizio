import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent {
  newsletterForm: FormGroup;

  quickLinks = [
    { label: 'Home', path: '' },
    { label: 'Destinations', path: '/destinations' },
    { label: 'Travel Package', path: '/packages' },
    { label: 'About Us', path: '/about' },
    { label: 'Contact', path: '/contact' }
  ];

  supportLinks = [
    'Help Center',
    'Booking Policy',
    'Travel Insurance',
    'Terms of Service',
    'Privacy Policy'
  ];

  constructor(private fb: FormBuilder) {
    this.newsletterForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubscribe() {
    if (this.newsletterForm.valid) {
      // Replace with real submit to API if available
      console.log('Subscribed:', this.newsletterForm.value.email);
      alert('Thanks — you are subscribed!');
      this.newsletterForm.reset();
    } else {
      this.newsletterForm.markAllAsTouched();
    }
  }
}
