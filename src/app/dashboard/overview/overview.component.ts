// overview.component.ts
import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class OverviewComponent implements OnInit {
  selectedTab: number = 0;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    // Fetch the saved state in ngOnInit
    const state = this.getStateFromSessionStorage();
    if (state && state.tabState !== undefined) {
      this.selectedTab = state.tabState;
    }

    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      // Retrieve the selected tab from the fragment of the URL
      const fragment = this.activatedRoute.snapshot.fragment;

      if (fragment) {
        // If a tab was previously selected, set the fragment in the URL
        window.location.hash = fragment;
      }
    });
  }

  tabChanged(event: any) {
    const selectedTabLabel = event.tab.textLabel;

    // Store the selected tab in sessionStorage
    sessionStorage.setItem('lastSelectedTab', selectedTabLabel);

    // Update the selected tab state
    this.selectedTab = event.index;
    this.setStateInSessionStorage();
  }

  private getStateFromSessionStorage() {
    const storedState = sessionStorage.getItem('tabState');
    return storedState ? JSON.parse(storedState) : null;
  }

  private setStateInSessionStorage() {
    const state = { tabState: this.selectedTab };
    sessionStorage.setItem('tabState', JSON.stringify(state));
  }
}
