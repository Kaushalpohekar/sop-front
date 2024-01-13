// pdf.component.ts
import { Component, ViewChild, ElementRef, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { DashService } from '../../dash-service/dash.service';

interface Screen {
  name: string;
}

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent implements OnInit {
  @ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>; // Reference to the file input element
  screenControl = new FormControl<Screen | null>(null, Validators.required);
  intervalControl = new FormControl<number | null>(null, Validators.required);
  screens: Screen[] = [];
  screenName!: string;
  screenData: any;
  ScreenOptions: any[] = [];

  isChecked = true;
  selectedFiles: File[] = [];
  fileRemoved = false;
  
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
    return this.isPdf(this.selectedFiles[index])
      ? this.getPdfFileUrl(this.selectedFiles[index])
      : null;
  }

  isPdf(file: File): boolean {
    return file.type === 'application/pdf';
  }

  private getPdfFileUrl(file: File): string {
    // Logic to generate PDF file URL dynamically
    // Example: return `/api/pdf/${file.name}`;
    return '';
  }

  resetFileInput(): void {
    // Reset the file input value to clear the selected file
    if (this.fileInputRef) {
      this.fileInputRef.nativeElement.value = '';
    }
  }
  logSelectedScreenAndInterval(): void {
    const selectedScreen = this.screenControl.value?.name;
    const selectedInterval = this.intervalControl.value;
  
    console.log('Selected Screen:', this.screenControl.value);
    console.log('Selected Interval:', selectedInterval);
  }
}
