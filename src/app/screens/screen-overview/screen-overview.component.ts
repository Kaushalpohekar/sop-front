import { Component } from '@angular/core';

@Component({
  selector: 'app-screen-overview',
  templateUrl: './screen-overview.component.html',
  styleUrls: ['./screen-overview.component.css']
})
export class ScreenOverviewComponent {
// Initialize screens array with backend data
screens = [
  { name: 'Screen 1' },
  { name: 'Screen 2' },
  { name: 'Screen 3' },
  { name: 'Screen 4' },
  { name: 'Screen 5' },
  { name: 'Screen 6' },
  { name: 'Screen 7' },

  // Add more screens as needed based on backend data
];
}
