import { Component, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

interface Screen {
  name: string;
}

@Component({
  selector: 'app-video',
  templateUrl: './video.component.html',
  styleUrls: ['./video.component.css']
})
export class VideoComponent {
  @ViewChild('fileInput') fileInput!: ElementRef;

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
}
