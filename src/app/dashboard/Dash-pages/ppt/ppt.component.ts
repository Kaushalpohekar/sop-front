import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DashService } from '../../dash-service/dash.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import Swal from 'sweetalert2';

interface Screen {
  ScreenID: number;
  ScreenName: string;
}

interface ContentData {
  contentDataId: string;
  raw_material: string;
  value: string;
  highlight: number;
}

interface Content {
  contentId: string;
  screenId: string;
  header: string;
  subheader: string;
  font_size: string;
  color: string;
  interval: number;
  data: ContentData[];
}

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  screenControl = new FormControl<Screen | null>(null, Validators.required);
  intervalControl = new FormControl<number | null>(5, Validators.required);
  screens: Screen[] = [];
  ScreenOptions: Screen[] = [];
  isChecked = true;
  selectedFiles: File[] = [];
  hasContentAdd: boolean = true; // Indicates if we are adding new content
  isEditing: boolean = false; // Indicates if we are editing content
  newRow: Content = this.initializeContent();
  isDataEditing: boolean = false; // Indicates if we are editing data rows
  newDataRow: ContentData = this.initializeContentData();

  data: Content[] = []; // For headers and subheaders
  displayedColumns: string[] = ['header', 'subheader', 'color', 'font_size', 'interval', 'action'];
  data2: ContentData[] = []; // For detailed content data
  displayedColumns2: string[] = ['srNo', 'rawMaterial', 'value', 'highlight', 'action'];

  constructor(private dashService: DashService, private snackBar: MatSnackBar) { }

  ngOnInit() {
    this.ScreenList();
    this.screenControl.valueChanges.subscribe((selectedScreen) => {
      if (selectedScreen) {
        this.getAllTextData(selectedScreen);
      }
    });
  }

  initializeContent(): Content {
    return {
      contentId: '',
      screenId: '',
      header: '',
      subheader: '',
      font_size: '',
      color: '#ffffff',
      interval: 0,
      data: []
    };
  }

  initializeContentData(): ContentData {
    return {
      contentDataId: '',
      raw_material: '',
      value: '',
      highlight: 0
    };
  }

  ScreenList() {
    this.dashService.getScreenDetails().subscribe(
      (getScreenDetails) => {
        if (getScreenDetails.getSOPData && getScreenDetails.getSOPData.length > 0) {
          this.ScreenOptions = getScreenDetails.getSOPData;
          this.screenControl.setValue(this.ScreenOptions[0]);
        } else {
          this.snackBar.open('No screen options available', 'OK', { duration: 5000 });
        }
      },
      (error) => {
        this.snackBar.open('Error fetching screen data', 'OK', { duration: 5000 });
      }
    );
  }

  getAllTextData(screen: Screen) {
    this.data = [];
    this.data2 = [];
    this.dashService.getTextData(screen.ScreenID).subscribe(
      (response: any) => {
        if (response && response.length > 0) {
          this.hasContentAdd = false;
          const content = response[0];
          this.data = [{
            contentId: content.contentId,
            screenId: content.screenId,
            header: content.header,
            subheader: content.subheader,
            font_size: content.font_size,
            color: content.color,
            interval: content.interval,
            data: content.data
          }];
          this.data2 = content.data;
        } else {
          this.hasContentAdd = true;
          this.data = [];
          this.data2 = [];
        }
      },
      (error) => {
        console.error(error);
        this.hasContentAdd = true;
        this.snackBar.open('Error fetching text data', 'OK', { duration: 5000 });
      }
    );
  }

  addNewRow() {
    this.isEditing = true;
    this.newRow = this.initializeContent();
    this.newRow.screenId = this.screenControl.value?.ScreenID.toString() ?? '';
    this.data = [this.newRow];
    this.data2 = [];
    this.hasContentAdd = true;
  }

  addNewDataRow() {
    this.isDataEditing = true;
    this.newDataRow = this.initializeContentData();
    this.data2 = [...this.data2, this.newDataRow];
  }

  editRow(element: Content) {
    this.isEditing = true;
    this.newRow = { ...element };
    this.data = [this.newRow];
    this.data2 = this.newRow.data;
    this.hasContentAdd = false;
  }

  editDataRow(element: ContentData) {
    this.isDataEditing = true;
    this.newDataRow = { ...element };
    // Convert number to boolean for UI use
    this.newDataRow.highlight = element.highlight === 1 ? 1 : 0;  // Ensure it's a number
    console.log(this.newDataRow);  // Check the value in the console
  }

  deleteDataRow(element: ContentData) {
    if (element.contentDataId) {
      const contentDataId = element.contentDataId;
      console.log(contentDataId);
  
      Swal.fire({
        title: 'Delete Data Row',
        text: 'Are you sure you want to delete this data row?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete',
        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // Call the delete service function if confirmed
          this.dashService.DeleteSOPTextContentData(contentDataId).subscribe(
            () => {
              Swal.fire({
                title: 'Data Row Deleted',
                text: 'Data row deleted successfully!',
                icon: 'success',
                confirmButtonText: 'Ok',
              }).then(() => {
                // Refresh the data after deletion
                this.getAllTextData(this.screenControl.value!);
              });
            },
            (error) => {
              console.error('Error deleting data row:', error);
  
              let errorMessage = 'An unexpected error occurred.';
              if (error.status === 401) {
                errorMessage = 'Unauthorized access. Please log in.';
              } else if (error.status === 404) {
                errorMessage = 'Data row not found.';
              }
  
              // Show error message if deletion fails
              Swal.fire({
                title: 'Error',
                text: errorMessage,
                icon: 'error',
                confirmButtonText: 'Ok',
              });
            }
          );
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Display cancellation message
          Swal.fire('Delete Canceled', 'Data row deletion canceled', 'info');
        }
      });
    }
  }
  


  saveRow() {
    if (this.isEditing) {
      const payload: Content = {
        ...this.newRow,
        screenId: this.screenControl.value?.ScreenID.toString() ?? '',
        data: this.data2
      };

      if (this.hasContentAdd) {
        this.dashService.InsertSOPTextData(payload).subscribe(
          (response) => {
            this.snackBar.open('Data inserted successfully', 'OK', { duration: 5000 });
            this.getAllTextData(this.screenControl.value!);
            this.isEditing = false;
          },
          (error) => {
            this.snackBar.open('Error inserting data', 'OK', { duration: 5000 });
          }
        );
      } else {
        this.dashService.UpdateSOPTextData(payload).subscribe(
          (response) => {
            this.snackBar.open('Data updated successfully', 'OK', { duration: 5000 });
            this.getAllTextData(this.screenControl.value!);
            this.isEditing = false;
          },
          (error) => {
            this.snackBar.open('Error updating data', 'OK', { duration: 5000 });
          }
        );
      }
    }
  }

  saveDataRow() {
    if (this.isDataEditing) {
      const payload = {
        ...this.newDataRow,
        contentId: this.data[0]?.contentId ?? '',
        highlight: this.newDataRow.highlight ? 1 : 0
      };

      

      if (this.newDataRow.contentDataId) {
        this.updateDataRow(payload);
        console.log("previous Data", payload);
      } else {
        this.insertDataRow(payload);
        console.log("New data Inserting", payload);
      }
    }
  }

  updateDataRow(payload: ContentData) {
    this.dashService.UpdateSOPTextContentData(payload).subscribe(
      (response) => {
        this.snackBar.open('Data updated successfully', 'OK', { duration: 5000 });
        this.getAllTextData(this.screenControl.value!);
        this.isDataEditing = false;
      },
      (error) => {
        this.snackBar.open('Error updating data', 'OK', { duration: 5000 });
      }
    );
  }

  insertDataRow(payload: ContentData) {
    this.dashService.InsertSOPTextContentData(payload).subscribe(
      (response) => {
        this.snackBar.open('Data inserted successfully', 'OK', { duration: 5000 });
        this.getAllTextData(this.screenControl.value!);
        this.isDataEditing = false;
      },
      (error) => {
        this.snackBar.open('Error inserting data', 'OK', { duration: 5000 });
      }
    );
  }

  cancel() {
    this.hasContentAdd = false;
    this.isEditing = false;
    this.isDataEditing = false;
  }
}
