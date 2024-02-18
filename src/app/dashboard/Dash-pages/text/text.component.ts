import { Component, OnInit } from '@angular/core';
import { DashService } from '../../dash-service/dash.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-text',
  templateUrl: './text.component.html',
  styleUrls: ['./text.component.css']
})

export class TextComponent{

  constructor(private dashService: DashService, private snackBar: MatSnackBar) {}

  ScreenOptions: any[] = [];
  screenData :any[] = [];
  selectedScreenID: any; 

  ngOnInit(): void {
    this.fetchScreenList();
  }

  fetchScreenList() {
    this.dashService.getScreenDetails().subscribe(
      (getScreenDetails) => {
        this.ScreenOptions = getScreenDetails.getSOPData;
        this.selectedScreenID = this.ScreenOptions[0].ScreenID;
        this.fetchScreenData(this.selectedScreenID);
      },
      (error) => {
        this.snackBar.open('Error fetching screen data', 'OK', {
          duration: 5000, // Duration in milliseconds
        });
      }
    );
  }

  onSelectionChange(event: any): void {
    this.selectedScreenID = event.value;
    this.screenData = [];
    this.fetchScreenData(this.selectedScreenID);
  }

  fetchScreenData(selectedScreenID: any) {
  this.dashService.getScreenDisplay(selectedScreenID).subscribe(
    (data: any) => {
      this.screenData = data.data;
    },
    (error) => {
      // Use MatSnackBar for displaying error messages
      this.snackBar.open('Error fetching screen data', 'OK', {
        duration: 5000, // Duration in milliseconds
      });
    }
  );
}


  getFullSrc(data:string, mime:string): string {
    const fullSrc = `data:${mime};base64,${data}`;
    return fullSrc;
  }

  isVideoType(mimeType: string): boolean {
    return mimeType.startsWith('video/');
  }
  onDeleteSOPData(FileName: string): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this data!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        this.dashService.deleteSOPData(FileName).subscribe(() => {
          Swal.fire('Deleted!', 'Your data has been deleted.', 'success');
          this.fetchScreenData(this.selectedScreenID);
        }, (error) => {
          Swal.fire('Error', 'Error while deleting data', 'error');
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your data is safe.', 'info');
        this.fetchScreenData(this.selectedScreenID);
      }
    });
  }
}