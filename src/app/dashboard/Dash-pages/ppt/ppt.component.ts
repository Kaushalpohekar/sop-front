// ppt.component.ts
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DashService } from '../../dash-service/dash.service';
import { Subscription } from 'rxjs';

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
  intervalControl = new FormControl<number | null>(null, Validators.required);
  screens: Screen[] = [];
  screenName!: string;
  screenData: any;
  ScreenOptions: any[] = [];

  isChecked = true;
  selectedFiles: File[] = [];
  fileRemoved = false;
    // Subscription for HTTP requests
    private sendSopDataSubscription: Subscription | undefined;
  
  constructor(private dashService: DashService) {}

  ngOnInit() {
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
    this.dashService.getScreenDetails().subscribe(
      (screens) => {
        this.screenData = screens.getSOPData;
      },
      (error) => {
        console.error('Error fetching screen details:', error);
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
  // Log selected screen and interval, and send image data to the API
  logSelectedScreenAndInterval(): void {
    const selectedScreen = this.screenControl.value;
    const selectedInterval = this.intervalControl.value ?? 0;
  
    if (selectedScreen === null || selectedScreen === undefined) {
      console.error('Please select a valid screen.');
      return;
    }
  
    console.log('Selected Screen:', selectedScreen);
    console.log('Selected Interval:', selectedInterval);
  
    // Cancel any ongoing HTTP requests before making new ones
    if (this.sendSopDataSubscription) {
      this.sendSopDataSubscription.unsubscribe();
    }
  
    // Iterate through each selected PDF and send a separate request
    this.selectedFiles.forEach((ppt, index) => {
      const pptData = {
        fileName: ppt.name,
        filePath: 'assets/uploads/ppt/' + ppt.name,
        screen: selectedScreen.toString(),
        duration: selectedInterval.toString(),
      };
  
      console.log(pptData);
  
      // Send the data to your API endpoint as JSON
      this.sendSopDataSubscription = this.dashService.sendSOPData(pptData).subscribe(
        (response) => {
          console.log(`SOP data ${index + 1} sent successfully:`, response);
        },
        (error) => {
          console.error(`Error sending SOP data ${index + 1}:`, error);
        }
      );
    });
  }
  
}
