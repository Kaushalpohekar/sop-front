import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DashService } from '../../dash-service/dash.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Screen {
  name: string;
}

@Component({
  selector: 'app-ppt',
  templateUrl: './ppt.component.html',
  styleUrls: ['./ppt.component.css']
})
export class PptComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Reference to the file input element

  screenControl = new FormControl<Screen | null>(null, Validators.required);
  intervalControl = new FormControl<number | null>(5, Validators.required);
  screens: Screen[] = [];
  screenName!: string;
  screenData: any;
  ScreenOptions: any[] = [];

  isChecked = true;
  selectedFiles: File[] = [];
  fileRemoved = false;
  // Subscription for HTTP requests
  private sendSopDataSubscription: Subscription | undefined;

  constructor(private dashService: DashService, private snackBar: MatSnackBar) {}

  ngOnInit() {
    this.ScreenList();
  }

  ScreenList() {
    this.dashService.getScreenDetails().subscribe(
      (getScreenDetails) => {
        if (getScreenDetails.getSOPData && getScreenDetails.getSOPData.length > 0) {
          this.ScreenOptions = getScreenDetails.getSOPData;
        this.screenControl.setValue(this.ScreenOptions[0].ScreenID);
        } else {
          this.snackBar.open('No screen options available', 'OK', {
            duration: 5000, // Duration in milliseconds
          });
        }
      },
      (error) => {
        this.snackBar.open('Error fetching screen data', 'OK', {
          duration: 5000, // Duration in milliseconds
        });
      }
    );
  }


  onFileSelected(event: Event): void {
    const files: FileList | null = (event.target as HTMLInputElement).files;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedFiles.push(files[i]);
      }

      this.fileRemoved = false;
    }
  }

  removeFile(index: number): void {
    this.selectedFiles.splice(index, 1);

    if (this.selectedFiles.length === 0) {
      this.fileRemoved = true;
      this.resetFileInput(); // Reset the file input
    }
  }

  getSelectedFileUrl(index: number): string | null {
    return this.isPpt(this.selectedFiles[index])
      ? this.getPptFileUrl(this.selectedFiles[index])
      : null;
  }

  isPpt(file: File): boolean {
    return file.type === 'application/vnd.ms-powerpoint' ||
           file.type === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  }

  private getPptFileUrl(file: File): string {
    // Logic to generate PPT file URL dynamically
    // Example: return `/api/ppt/${file.name}`;
    return '';
  }

  resetFileInput(): void {
    // Reset the file input value to clear the selected file
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  resetForm(): void {
    this.screenControl.reset();
    this.intervalControl.reset();
    this.selectedFiles = [];
    this.fileRemoved = true;
  }

  // Log selected screen and interval, and send image data to the API
  logSelectedScreenAndInterval(): void {
    const selectedScreen = this.screenControl.value;
    const selectedInterval = this.intervalControl.value ?? 0;

    if (selectedScreen === null || selectedScreen === undefined) {
      console.error('Please select a valid screen.');
      return;
    }

    // Cancel any ongoing HTTP requests before making new ones
    if (this.sendSopDataSubscription) {
      this.sendSopDataSubscription.unsubscribe();
    }

    // Iterate through each selected PowerPoint file and send a separate request
    this.selectedFiles.forEach((ppt, index) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result?.toString().split(',')[1];

        if (base64Data) {
          const pptData = {
            fileName: ppt.name,
            base64Data: base64Data,
            screen: selectedScreen.toString(),
            duration: selectedInterval.toString(),
          };

          // Send the data to your API endpoint as JSON
          this.sendSopDataSubscription = this.dashService.sendSOPData(pptData).subscribe(
            (response) => {
              // console.log(`SOP data ${index + 1} sent successfully:`, response);
            },
            (error) => {
              console.error(`Error sending SOP data ${index + 1}:`, error);
            },
            () => {
              // Reset the form after successful PowerPoint upload
              this.resetForm();
            }
          );
        }
      };

      reader.readAsDataURL(ppt);
    });
  }
}
