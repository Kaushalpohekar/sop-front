import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from '../screen-service/screen-service.service';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-display-screen',
  templateUrl: './display-screen.component.html',
  styleUrls: ['./display-screen.component.css'],
})
export class DisplayScreenComponent implements OnInit {
  public imageDataList: any[] = [];
  public currentImageDataIndex: number = 0;

  pdfSrc = '../../assets/report_data.pdf';
  constructor(
    private route: ActivatedRoute,
    private screenService: ScreenService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    this.route.paramMap
      .pipe(
        switchMap(params => {
          const screenId = params.get('screenId');
          if (screenId) {
            return this.screenService.getScreenDisplay(screenId);
          } else {
            return of(null);
          }
        })
      )
      .subscribe(
        (data: any) => {
          if (data && data.data && data.data.length > 0) {
            this.imageDataList = data.data;
            this.showFullScreenImage();
          }
        },
        (error) => {
          console.error(error);
        }
      );
  }

  getSafeUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  showFullScreenImage() {
    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    this.currentImageDataIndex = (this.currentImageDataIndex + 1) % this.imageDataList.length;

    setTimeout(() => {
      this.showFullScreenImage();
    }, currentImageData.Duration * 1000);
  }

  getImageSource(): string {
    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    const mimeType = currentImageData.Base64File.mimeType;

    switch (mimeType) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        return `data:${mimeType};base64,${currentImageData.Base64File.data}`;

      case 'application/pdf':
        return `data:${mimeType};base64,${currentImageData.Base64File.data}`;

      case 'application/vnd.ms-powerpoint':
      case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
        return `data:application/pdf;base64,${currentImageData.Base64File.data}`;

      case 'video/mp4':
      case 'video/webm':
      case 'video/ogg':
        return `data:${mimeType};base64,${currentImageData.Base64File.data}`;

      default:
        console.error('Unsupported content type:', mimeType);
        return '';
    }
  }

  isImageType(): boolean {
    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    const mimeType = currentImageData.Base64File.mimeType;
    return ['image/jpeg', 'image/png', 'image/gif'].includes(mimeType);
  }

  isPdfType(): boolean {
    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    const mimeType = currentImageData.Base64File.mimeType;
    return mimeType === 'application/pdf';
  }

  isPptType(): boolean {
    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    const mimeType = currentImageData.Base64File.mimeType;
    return mimeType === 'application/vnd.ms-powerpoint' || mimeType === 'application/vnd.openxmlformats-officedocument.presentationml.presentation';
  }

  isVideoType(): boolean {
    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    const mimeType = currentImageData.Base64File.mimeType;
    return ['video/mp4', 'video/webm', 'video/ogg'].includes(mimeType);
  }
}
