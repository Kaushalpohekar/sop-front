import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ScreenService } from '../screen-service/screen-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-screen-overview',
  templateUrl: './screen-overview.component.html',
  styleUrls: ['./screen-overview.component.css']
})
export class ScreenOverviewComponent {
  
  ScreenOptions: any[] = [];
  
  constructor(private dashService: ScreenService, private router: Router, private snackBar: MatSnackBar) {}
  ngOnInit(): void {
    this.ScreenList();
  }

  ScreenList() {
    this.dashService.getScreenDetails().subscribe(
      (getScreenDetails) => {
        this.ScreenOptions = getScreenDetails.getSOPData;
      },
      (error) => {
        this.snackBar.open('Error occurred while fetching screen details', 'Dismiss', {
          duration: 3000,
        });
      }
    );
  }

  navigateToScreen(screenId: string) {
    if (screenId) {
      this.router.navigate(['/screens/display', screenId]);
    } else {
      console.error('Screen ID is undefined');
    }
  }

}
