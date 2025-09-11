import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms'; 
import { INDIA_STATES } from '../../data/destinations-data';

@Component({
  selector: 'app-destinations',
  standalone: true,
  imports: [CommonModule, RouterLink,FormsModule], // RouterLink added here
  templateUrl: './destinations.html',
  styleUrl: './destinations.css'
})
export class DestinationsComponent implements OnInit {
  allPlaces: any[] = [];
  filteredPlaces: any[] = [];
  states = INDIA_STATES.map(s => s.state);
  activeStateFilter: string | null = null;
  currentSortOrder: 'asc' | 'desc' | 'popularity' | null = null;
    searchText: string = ''; // ✅ Step 1: Add search property


  constructor(private route: ActivatedRoute) {
      INDIA_STATES.forEach(state => {
        // Add the state name to each place for filtering
        state.places.forEach(place => {
          this.allPlaces.push({ ...place, state: state.state });
        });
      });
  }

  ngOnInit(): void {
  // This code checks if a state was passed in the URL to pre-filter the page.
  this.route.queryParams.subscribe(params => {
    const selectedState = params['state']; // The key must be 'state'
    console.log('Selected State from URL:', selectedState); // Add this line for debugging
    
    if (selectedState) {
      this.filterByState(selectedState);
      this.activeStateFilter = selectedState;
    } else {
      // If no state is selected, show all places.
      this.filteredPlaces = [...this.allPlaces];
      this.activeStateFilter = null;
    }
  });
}

  getPopularityText(popularity: number): string {
    if (popularity >= 5) {
      return 'Very Highly Visited';
    } else if (popularity >= 4) {
      return 'Highly Visited';
    } else if (popularity >= 3) {
      return 'Moderately Visited';
    } else if (popularity >= 2) {
      return 'Less Visited';
    } else {
      return 'Rarely Visited';
    }
  }

  getStarsArray(popularity: number): any[] {
    return Array(popularity).fill(0);
  }

  filterByState(state: string) {
  // Now each place has a 'state' property for filtering
  this.filteredPlaces = this.allPlaces.filter(place => place.state === state);
  this.activeStateFilter = state;
}
filterBySearch() {
    const search = this.searchText.toLowerCase();
    this.filteredPlaces = this.allPlaces.filter(place =>
      place.name.toLowerCase().includes(search) ||
      place.city.toLowerCase().includes(search) ||
      place.description.toLowerCase().includes(search) ||
      (place.categories && place.categories.some((cat: string) =>
        cat.toLowerCase().includes(search)
      ))
    );
  }
  sortByPopularity() {
    this.filteredPlaces.sort((a, b) => b.popularity - a.popularity);
    this.currentSortOrder = 'popularity';
  }

  sortByNameAsc() {
    this.filteredPlaces.sort((a, b) => a.name.localeCompare(b.name));
    this.currentSortOrder = 'asc';
  }

  sortByNameDesc() {
    this.filteredPlaces.sort((a, b) => b.name.localeCompare(a.name));
    this.currentSortOrder = 'desc';
  }
}