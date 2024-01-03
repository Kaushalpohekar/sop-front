// pdf.component.ts
import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

interface Screen {
  name: string;
}

@Component({
  selector: 'app-pdf',
  templateUrl: './pdf.component.html',
  styleUrls: ['./pdf.component.css']
})
export class PdfComponent {
  @ViewChild('fileInputRef') fileInputRef!: ElementRef<HTMLInputElement>; // Reference to the file input element

  screenControl = new FormControl<Screen | null>(null, Validators.required);
  intervalControl = new FormControl<number | null>(null, Validators.required);
  screens: Screen[] = [
    { name: 'Screen 1' },
    { name: 'Screen 2' },
    { name: 'Screen 3' },
    { name: 'Screen 4' },
  ];

  isChecked = true;
  selectedFiles: File[] = [];
  fileRemoved = false;

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
}
