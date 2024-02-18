import { Component, OnInit } from '@angular/core';
import { DashService } from '../../dash-service/dash.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})

export class TextComponent{

  constructor(private dashService: DashService, private snackBar: MatSnackBar) {}

  ScreenOptions: any[] = [];
  screenData :any[] = [];

  ngOnInit(): void {
    this.fetchScreenList();
  }

  fetchScreenList() {
    this.dashService.getScreenDetails().subscribe(
      (getScreenDetails) => {
        this.ScreenOptions = getScreenDetails.getSOPData;
      },
      (error) => {
        this.snackBar.open('Error fetching screen data', 'OK', {
          duration: 5000, // Duration in milliseconds
        });
      }
    );
  }

  onSelectionChange(event: any): void {
    const selectedScreenID = event.value;
    console.log(selectedScreenID);
    this.fetchScreenData(selectedScreenID);
  }

  fetchScreenData(selectedScreenID: any) {
    this.dashService.getScreenDisplay(selectedScreenID).subscribe(
      (data: any) => {
        this.screenData = data.data;
        console.log(this.screenData);
      },
      (error) => {
        console.log("error While Fetching tthe data ", error);
      }
    );
  }

  getFullSrc(data:string, mime:string): string {
    const fullSrc = `data:${mime};base64,${data}`;
    return fullSrc;
  }
}