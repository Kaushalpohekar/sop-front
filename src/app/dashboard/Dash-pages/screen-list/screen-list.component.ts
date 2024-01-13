import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DashService } from '../../dash-service/dash.service';

interface Screen {
  name: string;
}

@Component({
  selector: 'app-screen-list',
  templateUrl: './screen-list.component.html',
  styleUrls: ['./screen-list.component.css']
})
export class ScreenListComponent implements OnInit {
  screenControl = new FormControl<Screen | null>(null, Validators.required);
  screens: Screen[] = [];
  screenName!: string;
  screenData: any;
  ScreenOptions: any[] = [];
  @Output() selectedScreenChange = new EventEmitter<Screen | null>();
  selectedScreen: Screen | null = null; // This variable will hold the selected screen

  constructor(private dashService: DashService) {}

  ngOnInit(): void {
    this.ScreenList();
    this.ScreenDetails();
  }

  ScreenList() {
    this.dashService.getScreenDetails().subscribe(
      (getScreenDetails) => {
        this.ScreenOptions = getScreenDetails.getSOPData;
        console.log(this.ScreenOptions);
      },
      (error) => {
        console.log("Screen Name Data is not Fetching!!", error);
      }
    );
  }

  ScreenDetails() {
    // You may want to implement this method if needed
  }

  // Emit the selected screen when it changes
  onScreenSelectionChange(): void {
    this.selectedScreen = this.screenControl.value;
    this.selectedScreenChange.emit(this.selectedScreen);
  }
  
}
