import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScreenService } from '../screen-service/screen-service.service';
@Component({
  selector: 'app-screen-overview',
  templateUrl: './screen-overview.component.html',
  styleUrls: ['./screen-overview.component.css']
})
export class ScreenOverviewComponent {
  
  ScreenOptions: any[] = [];
  
  constructor(private dashService: ScreenService, private router: Router) {}
  ngOnInit(): void {
    this.ScreenList();
  }
// Initialize screens array with backend data
// screens = [
//   { name: 'Screen 1' },
//   { name: 'Screen 2' },
//   { name: 'Screen 3' },
//   { name: 'Screen 4' },
//   { name: 'Screen 5' },
//   { name: 'Screen 6' },
//   { name: 'Screen 7' },

  // Add more screens as needed based on backend data
// ];
ScreenList() {
  this.dashService.getScreenDetails().subscribe(
    (getScreenDetails) => {
      // Assuming getSOPData is the correct property, adjust if needed
      this.ScreenOptions = getScreenDetails.getSOPData;
      console.log(this.ScreenOptions);
    },
    (error) => {
      console.log("Screen Name Data is not Fetching!!", error);
    }
  );
}

navigateToScreen(screenId: string) {
  // Check if screenId is defined before navigating
  if (screenId) {
    // Use the navigate method to navigate to the dynamic route with the selected screen ID
    this.router.navigate(['/screens/display', screenId]);
  } else {
    console.error('Screen ID is undefined');
  }
}

}
