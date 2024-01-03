import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface Screen {
  name: string;
}

@Component({
  selector: 'app-image',
  templateUrl: './image.component.html',
  styleUrls: ['./image.component.css']
})
export class ImageComponent {
  screenControl = new FormControl<Screen | null>(null, Validators.required);
  intervalControl = new FormControl<number | null>(null, Validators.required);
  screens: Screen[] = [
    { name: 'Screen 1' },
    { name: 'Screen 2' },
    { name: 'Screen 3' },
    { name: 'Screen 4' },
  ];

  selectedImages: File[] = [];
  imageRemoved = false;

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
  isChecked = true;
  
}

