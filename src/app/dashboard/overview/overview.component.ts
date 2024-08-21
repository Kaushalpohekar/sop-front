// overview.component.ts
import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  selectedTab: number = 0;

  ngOnInit() {
    // Check if the tab is stored in the session storage
    const storedTab = sessionStorage.getItem('selectedTab');

    if (storedTab) {
      this.selectedTab = +storedTab; // Convert to number
    } else {
      // If no tab is stored, display the first tab by default
      this.selectedTab = 0;
    }
  }

  tabChanged(selectedTab:any): void {
    // Update the selected tab and store it in the session storage
    // this.selectedTab = event.index;
    console.log(selectedTab)
    sessionStorage.setItem('selectedTab', selectedTab.toString());
  }
}
