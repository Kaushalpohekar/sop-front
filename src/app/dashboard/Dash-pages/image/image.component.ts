import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DashService } from '../../dash-service/dash.service';
import { HttpClient } from '@angular/common/http';

interface Screen {
  name: string;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent implements OnInit {
  screenControl = new FormControl<Screen | null>(null, Validators.required);
  intervalControl = new FormControl<number | null>(null, Validators.required);
  screens: Screen[] = [];
  screenName!: string;
  screenData: any;
  ScreenOptions: any[] = [];

  selectedImages: File[] = [];
  imageRemoved = false;

  isChecked = true;

  constructor(private dashService: DashService,private http: HttpClient) {}

  ngOnInit() {
    this.ScreenList();
    this.ScreenDetails();
  }

  handleFileUpload(event: any): void {
    const file: File = event.target.files[0];
  
    if (file) {
      const newFileName = this.generateUniqueFileName(file.name);
      const destinationPath = `assets/uploads/${newFileName}`;
  
      this.uploadFile(file, destinationPath);
    }
  }
  
  uploadFile(file: File, destinationPath: string): void {
    const formData: FormData = new FormData();
    formData.append('file', file, destinationPath);
  
    // Make an HTTP request to upload the file
    this.http.post<any>('/api/upload', formData).subscribe(
      (response) => {
        console.log('File uploaded successfully:', response);
      },
      (error) => {
        console.error('Error uploading file:', error);
      }
    );
  }
  
  generateUniqueFileName(originalFileName: string): string {
    const timestamp = new Date().getTime();
    const extension = originalFileName.split('.').pop();
    return `${timestamp}.${extension}`;
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

  onFileSelected(event: any): void {
    const files: FileList = event.target.files;

    if (files && files.length > 0) {
      for (let i = 0; i < files.length; i++) {
        this.selectedImages.push(files[i]);
      }

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
  logSelectedScreenAndInterval(): void {
    const selectedScreen = this.screenControl.value?.name;
    const selectedInterval = this.intervalControl.value;
  
    console.log('Selected Screen:', selectedScreen);
    console.log('Selected Interval:', selectedInterval);
  
    // Print details of uploaded images
    this.selectedImages.forEach((image, index) => {
      console.log(`Image ${index + 1}:`);
      console.log('  Name:', image.name);
      console.log('  Source Path:', URL.createObjectURL(image));
    });
  }
  
  
  

}
