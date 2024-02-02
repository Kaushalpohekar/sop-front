import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DashService } from '../../dash-service/dash.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

interface Screen {
  ScreenID: number;
  ScreenName: string;
  screen?: string | null;
  duration?: string | null;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit, OnDestroy {
  // Form controls
  screenControl = new FormControl<number | null>(null, Validators.required);
  intervalControl = new FormControl<number | null>(null, Validators.required);

  // Data
  ScreenOptions: Screen[] = [];
  selectedImages: File[] = [];
  imageRemoved = false;
  isChecked = true;

  // Subscription for HTTP requests
  private sendImageSubscription: Subscription | undefined;

  constructor(private dashService: DashService, private http: HttpClient) {}

  ngOnInit() {
    this.fetchScreenList();
  }

  ngOnDestroy() {
    // Unsubscribe from any ongoing HTTP requests to avoid memory leaks
    if (this.sendImageSubscription) {
      this.sendImageSubscription.unsubscribe();
    }
  }

  // Fetch screen list from the service
  fetchScreenList() {
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

  // Handle file upload
  handleFileUpload(event: any): void {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      this.selectedImages = Array.from(files); // Convert FileList to Array

      this.imageRemoved = false;
    }
  }

  // Remove selected image
  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);

    if (this.selectedImages.length === 0) {
      this.imageRemoved = true;
    }
  }

  // Get URL for the selected image
  getSelectedImageUrl(index: number): string | null {
    return this.selectedImages[index] ? URL.createObjectURL(this.selectedImages[index]) : null;
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
    if (this.sendImageSubscription) {
      this.sendImageSubscription.unsubscribe();
    }
  
    // Iterate through each selected image and send a separate request
    this.selectedImages.forEach((image, index) => {
      // Prepare data for the current image
      const imageData = {
        fileName: image.name,
        filePath: 'assets/uploads/images/' + image.name,
        screen: selectedScreen.toString(),
        duration: selectedInterval.toString(),
      };
  
      console.log(imageData);
  
      // Send the data to your API endpoint as JSON
      this.sendImageSubscription = this.dashService.sendImageData(imageData).subscribe(
        (response) => {
          console.log(`Image ${index + 1} data sent successfully:`, response);
        },
        (error) => {
          console.error(`Error sending image ${index + 1} data:`, error);
        }
      );
    });
  }
  
}