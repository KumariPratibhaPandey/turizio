import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { INDIA_STATES } from '../../data/destinations-data'; // This is the correct variable name

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class HomeComponent {
  // Use the correct variable name when getting the data
  featuredStates = INDIA_STATES.slice(0, 3);
}