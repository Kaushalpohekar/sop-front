// screen.component.ts

import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { DashService } from '../../dash-service/dash.service';
import { FormControl, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface PeriodicElement {
  ScreenName: string;
  position: number;
  symbol: string;
  editMode?: boolean;
}

@Component({
  selector: 'app-screen',
  templateUrl: './screen.component.html',
  styleUrls: ['./screen.component.css']
})
export class ScreenComponent implements AfterViewInit, OnInit {
  dataSource = new MatTableDataSource<PeriodicElement>([]);
  displayedColumns: string[] = ['ScreenName', 'symbol'];
  screenData: any;
  editMode = false;

  ScreenOptions: any = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  screenName = new FormControl('', [Validators.required]);
  screenNameEdit = new FormControl('', [Validators.required]);

  constructor(private dashService: DashService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.ScreenDetails();
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  ScreenDetails() {
    this.dashService.getScreenDetails().subscribe(
      (getScreenDetails) => {
        this.screenData = getScreenDetails.getSOPData;
      },
      (error) => {
        this.snackBar.open('Tasksheet Data is not Fetching!!', 'Close', {
          duration: 3000,
          panelClass: ['snackbar-error']
        });
      }
    );
  }

  onAddScreen() {
    if (this.screenName.valid) {
      const ScreenName = { screenName: this.screenName.value };
      this.dashService.addScreen(ScreenName).subscribe(
        () => {
          Swal.fire({
            title: 'Screen Added',
            text: 'Screen added successfully!',
            icon: 'success',
            confirmButtonText: 'Ok',
          }).then(() => {
            this.ScreenDetails();
            this.screenName.reset();
          });
        },
        (error) => {
          console.error('Error adding screen:', error);

          Swal.fire({
            title: 'Error',
            text: 'Failed to add screen. Please try again.',
            icon: 'error',
            confirmButtonText: 'Ok',
          });
        }
      );
    } else {
      this.screenName.markAsTouched();
    }
  }

  deleteScreen(screen: any): void {
    if (screen.ScreenID) {
      const ScreenID = screen.ScreenID;

      Swal.fire({
        title: 'Delete Screen',
        text: 'Are you sure you want to delete this screen?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.dashService.deleteScreen(ScreenID).subscribe(
            () => {
              console.log('Screen Deleted Successfully!!');
              Swal.fire({
                title: 'Screen Deleted',
                text: 'Screen deleted successfully!',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                this.ScreenDetails();
              });
            },
            (error) => {
              console.error('Error deleting screen:', error);

              let errorMessage = 'An unexpected error occurred.';
              if (error.status === 401) {
                errorMessage = 'Unauthorized access. Please log in.';
              } else if (error.status === 404) {
                errorMessage = 'Screen not found.';
              }

              Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Delete Canceled', 'Screen deletion canceled', 'info');
        }
      });
    }
  }

  onEditScreen(element: PeriodicElement) {
    this.screenData.forEach((item: PeriodicElement) => item.editMode = (item === element));
    this.screenNameEdit.patchValue(element.ScreenName);
  }

  onCancelEdit(element: PeriodicElement) {
    element.editMode = false;
  }

  onSaveEdit(element: PeriodicElement) {
    element.editMode = false;

    if (this.screenNameEdit.valid) {
      const screenData = {
        screenName: this.screenNameEdit.value
      };

      console.log(element);
      this.dashService.editScreen(element, screenData).subscribe(
        () => {
          // Success
          Swal.fire({
            icon: 'success',
            title: 'Screen Edited Successfully',
            showConfirmButton: false,
            timer: 1500 // Adjust the timer as needed
          });
          this.ScreenDetails();
        },
        (error) => {
          // Error
          Swal.fire({
            icon: 'error',
            title: 'Error Editing Screen',
            text: 'Please try again later.',
          });
          console.error('Error editing screen:', error);
        }
      );
    }
  }
}
