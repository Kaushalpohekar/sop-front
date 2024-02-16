import { Component, OnInit, OnDestroy, ChangeDetectionStrategy, NgZone } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DashService } from '../../dash-service/dash.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';

interface Screen {
  ScreenID: number;
  ScreenName: string;
  screen?: string | null;
  duration?: string | null;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImageComponent implements OnInit, OnDestroy {
  screenControl = new FormControl<number | null>(null, Validators.required);
  intervalControl = new FormControl<number | null>(null, Validators.required);
  ScreenOptions: Screen[] = [];
  selectedImages: File[] = [];
  imageRemoved = false;
  isChecked = true;
  private sendImageSubscription: Subscription | undefined;

  constructor(private dashService: DashService, private http: HttpClient, private ngZone: NgZone) {}

  ngOnInit() {
    this.fetchScreenList();
  }

  ngOnDestroy() {
    this.unsubscribeFromImageSubscription();
  }

  fetchScreenList() {
    this.dashService.getScreenDetails().subscribe(
      (getScreenDetails) => {
        this.ScreenOptions = getScreenDetails.getSOPData;
      },
      (error) => {
        console.error("Screen Name Data is not Fetching!!", error);
      }
    );
  }

  handleFileUpload(event: any): void {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      this.selectedImages = Array.from(files);
      this.imageRemoved = false;
    }
  }

  removeImage(index: number): void {
    this.selectedImages.splice(index, 1);

    if (this.selectedImages.length === 0) {
      this.imageRemoved = true;
    }
  }

  getSelectedImageUrl(index: number): string | null {
    return this.selectedImages[index] ? URL.createObjectURL(this.selectedImages[index]) : null;
  }

  resetForm(): void {
    this.screenControl.reset();
    this.intervalControl.reset();
    this.selectedImages = [];
    this.imageRemoved = true;
  }

  logSelectedScreenAndInterval(): void {
    const selectedScreen = this.screenControl.value;
    const selectedInterval = this.intervalControl.value ?? 0;

    if (selectedScreen == null) {
      console.error('Please select a valid screen.');
      return;
    }

    console.log('Selected Screen:', selectedScreen);
    console.log('Selected Interval:', selectedInterval);

    this.unsubscribeFromImageSubscription();

    this.selectedImages.forEach((image, index) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64Data = reader.result?.toString().split(',')[1];

        if (base64Data) {
          const imageData = {
            fileName: image.name,
            base64Data: base64Data,
            screen: selectedScreen.toString(),
            duration: selectedInterval.toString(),
          };

          console.log(imageData);

          this.ngZone.run(() => {
            this.sendImageSubscription = this.dashService.sendImageData(imageData)
              .pipe(
                catchError(error => {
                  console.error(`Error sending image ${index + 1} data:`, error);
                  throw error;
                }),
                finalize(() => {
                  console.log(`Image ${index + 1} data sent successfully.`);
                  // Reset the form after successful image upload
                  this.resetForm();
                })
              )
              .subscribe();
          });
        }
      };

      reader.readAsDataURL(image);
    });
  }

  private unsubscribeFromImageSubscription() {
    if (this.sendImageSubscription) {
      this.sendImageSubscription.unsubscribe();
    }
  }
}
