import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DashService } from '../../dash-service/dash.service';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

interface Screen {
  name: string;
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent implements OnInit {
  @ViewChild('fileInput') fileInput!: ElementRef;

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
  private sendVideoDataSubscription: Subscription | undefined;

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
    }
  }

  resetFileInput(): void {
    // Reset the file input value to clear the selected file
    this.fileInput.nativeElement.value = '';
  }

  getSelectedFileUrl(index: number): string | null {
    // Logic to generate video file URL dynamically
    // Example: return `/api/videos/${this.selectedFiles[index].name}`;
    return '';
  }

  logSelectedScreenAndInterval(): void {
    const selectedScreen = this.screenControl.value;
    const selectedInterval = this.intervalControl.value ?? 0;

    if (selectedScreen === null || selectedScreen === undefined) {
      console.error('Please select a valid screen.');
      return;
    }

    // Cancel any ongoing HTTP requests before making new ones
    if (this.sendVideoDataSubscription) {
      this.sendVideoDataSubscription.unsubscribe();
    }

    // Iterate through each selected video file and send a separate request
    this.selectedFiles.forEach((video, index) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result?.toString().split(',')[1];

        if (base64Data) {
          const videoData = {
            fileName: video.name,
            base64Data: base64Data,
            screen: selectedScreen.toString(),
            duration: selectedInterval.toString(),
          };

          // Send the data to your API endpoint as JSON
          this.sendVideoDataSubscription = this.dashService.sendSOPData(videoData).subscribe(
            (response) => {
              // console.log(`Video data ${index + 1} sent successfully:`, response);
            },
            (error) => {
              console.error(`Error sending video data ${index + 1}:`, error);
            }
          );
        }
      };

      reader.readAsDataURL(video);
    });
  }
}
