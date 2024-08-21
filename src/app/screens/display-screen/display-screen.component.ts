// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ScreenService } from '../screen-service/screen-service.service';
// import { DomSanitizer } from '@angular/platform-browser';
// import { Observable, of } from 'rxjs';
// import { switchMap } from 'rxjs/operators';

// @Component({
//   selector: 'app-display-screen',
//   templateUrl: './display-screen.component.html',
//   styleUrls: ['./display-screen.component.css'],
// })
// export class DisplayScreenComponent implements OnInit {
//   public imageDataList: any[] = [];
//   public currentImageDataIndex: number = 0;
//   public animate: boolean = false; // Animation state
//   public showText: boolean = false;
//   public showMedia: boolean = false;
//   public textData: any;
//   private mediaDisplayInterval: number = 5000; // Interval for displaying media
//   private textDisplayDuration: number = 5000; // Duration for displaying text

//   constructor(
//     private route: ActivatedRoute,
//     private screenService: ScreenService,
//     private sanitizer: DomSanitizer
//   ) {}

//   ngOnInit() {
//     this.route.paramMap
//       .pipe(
//         switchMap(params => {
//           const screenId = params.get('screenId');
//           if (screenId) {
//             return this.screenService.getScreenDisplay(screenId);
//           } else {
//             return of(null);
//           }
//         })
//       )
//       .subscribe(
//         (data: any) => {
//           if (data && data.data && data.data.length > 0) {
//             this.imageDataList = data.data;
//             const screenId = this.route.snapshot.paramMap.get('screenId');
//             if (screenId) {
//               this.screenService.getScreenTextData(screenId).subscribe(
//                 (textData) => {
//                   this.textData = textData;
//                   this.startDisplayingContent(); // Start the display cycle
//                 },
//                 (error) => {
//                   console.error('Error fetching text data:', error);
//                 }
//               );
//             } else {
//               console.error('No screen ID found in route parameters.');
//             }
//           }
//         },
//         (error) => {
//           console.error('Error fetching screen display data:', error);
//         }
//       );
//   }
  
//   startDisplayingContent() {
//     this.displayText();
//   }

//   displayText() {
//     this.showText = true;
//     this.showMedia = false;
//     setTimeout(() => {
//       this.showText = false;
//       this.displayMedia();
//     }, this.textDisplayDuration);
//   }

//   displayMedia() {
//     this.showText = false;
//     this.showMedia = true;
//     this.animate = true;

//     this.showFullScreenImage();

//     setTimeout(() => {
//       this.animate = false;
//       this.moveToNextContent();
//     }, this.mediaDisplayInterval);
//   }

//   showFullScreenImage() {
//     const currentImageData = this.imageDataList[this.currentImageDataIndex];
//     if (!currentImageData) return;
  
//     const isVideo = this.isVideoType();
//     const videoElement = document.getElementById('videoElement') as HTMLVideoElement;
//     const imageElement = document.getElementById('imageElement') as HTMLImageElement;
  
//     if (isVideo) {
//       if (videoElement) {
//         videoElement.src = this.getImageSource();
//         videoElement.style.display = 'block'; // Ensure the video is visible
//         if (imageElement) imageElement.style.display = 'none'; // Hide image element if any
  
//         videoElement.onloadeddata = () => {
//           videoElement.play().catch(error => {
//             console.error('Error playing video:', error);
//           });
//         };
  
//         videoElement.onerror = () => {
//           console.error('Error loading video.');
//         };
  
//         videoElement.onended = () => {
//           this.moveToNextContent();
//         };
//       }
//     } else {
//       if (imageElement) {
//         imageElement.src = this.getImageSource();
//         imageElement.style.display = 'block'; // Ensure the image is visible
//         if (videoElement) videoElement.style.display = 'none'; // Hide video element if any
//       }
//     }
//   }
  

//   moveToNextContent() {
//     this.currentImageDataIndex = (this.currentImageDataIndex + 1) % this.imageDataList.length;
//     // Restart the cycle by displaying text again
//     this.displayText();
//   }

//   getImageSource(): string {
//     const currentImageData = this.imageDataList[this.currentImageDataIndex];
//     if (!currentImageData) return '';

//     const mimeType = currentImageData.Base64File.mimeType;
//     return `data:${mimeType};base64,${currentImageData.Base64File.data}`;
//   }

//   isImageType(): boolean {
//     const currentImageData = this.imageDataList[this.currentImageDataIndex];
//     const mimeType = currentImageData ? currentImageData.Base64File.mimeType : '';
//     return ['image/jpeg', 'image/png', 'image/gif'].includes(mimeType);
//   }

//   isVideoType(): boolean {
//     const currentImageData = this.imageDataList[this.currentImageDataIndex];
//     const mimeType = currentImageData ? currentImageData.Base64File.mimeType : '';
//     return ['video/mp4', 'video/webm', 'video/ogg'].includes(mimeType);
//   }
// }

// import { Component, OnInit } from '@angular/core';
// import { ActivatedRoute } from '@angular/router';
// import { ScreenService } from '../screen-service/screen-service.service';
// import { DomSanitizer } from '@angular/platform-browser';
// import { Observable, of } from 'rxjs';
// import { switchMap, catchError } from 'rxjs/operators';

// @Component({
//   selector: 'app-display-screen',
//   templateUrl: './display-screen.component.html',
//   styleUrls: ['./display-screen.component.css'],
// })
// export class DisplayScreenComponent implements OnInit {
//   public imageDataList: any[] = [];
//   public currentImageDataIndex: number = 0;
//   public animate: boolean = false;
//   public showText: boolean = false;
//   public showMedia: boolean = false;
//   public textData: any;
//   private textDisplayDuration: number = 5000;

//   constructor(
//     private route: ActivatedRoute,
//     private screenService: ScreenService,
//     private sanitizer: DomSanitizer
//   ) {}

//   ngOnInit() {
//     const screenId = this.route.snapshot.paramMap.get('screenId');
//     if (screenId) {
//       this.fetchScreenDisplay(screenId);
//       this.fetchScreenTextData(screenId);
//     } else {
//       console.error('No screen ID found in route parameters.');
//     }
//   }

//   fetchScreenDisplay(screenId: string) {
//     this.screenService.getScreenDisplay(screenId).pipe(
//       catchError((error) => {
//         console.error('Error fetching screen display data:', error);
//         return of(null); // Return null to continue the observable chain
//       })
//     ).subscribe(
//       (data: any) => {
//         if (data && data.data && data.data.length > 0) {
//           this.imageDataList = data.data;
//         }
//       }
//     );
//   }

//   fetchScreenTextData(screenId: string) {
//     this.screenService.getScreenTextData(screenId).pipe(
//       catchError((error) => {
//         console.error('Error fetching text data:', error);
//         return of(null); // Return null to continue the observable chain
//       })
//     ).subscribe(
//       (textData) => {
//         this.textData = textData;
//         this.startDisplayingContent(); // Start the display cycle
//       }
//     );
//   }

//   startDisplayingContent() {
//     this.displayText();
//   }

//   displayText() {
//     this.showText = true;
//     this.showMedia = false;
//     setTimeout(() => {
//       this.showText = false;
//       this.currentImageDataIndex = 0; // Reset to start of media list
//       this.displayMedia();
//     }, this.textDisplayDuration);
//   }

//   displayMedia() {
//     if (this.currentImageDataIndex >= this.imageDataList.length) {
//       this.startDisplayingContent(); // Restart the cycle
//       return;
//     }

//     this.showText = false;
//     this.showMedia = true;
//     this.animate = true;

//     this.showFullScreenImage();

//     const currentImageData = this.imageDataList[this.currentImageDataIndex];
//     const mediaDisplayInterval = parseInt(currentImageData.Duration) * 1000;

//     if (this.isImageType()) {
//       setTimeout(() => {
//         this.animate = false;
//         this.moveToNextContent();
//       }, mediaDisplayInterval);
//     }
//   }

//   showFullScreenImage() {
//     const currentImageData = this.imageDataList[this.currentImageDataIndex];
//     if (!currentImageData) return;

//     const isVideo = this.isVideoType();
//     const videoElement = document.getElementById('videoElement') as HTMLVideoElement;
//     const imageElement = document.getElementById('imageElement') as HTMLImageElement;

//     if (isVideo) {
//       if (videoElement) {
//         videoElement.src = this.getImageSource();
//         videoElement.style.display = 'block';
//         if (imageElement) imageElement.style.display = 'none';

//         videoElement.onloadeddata = () => {
//           videoElement.play().catch(error => {
//             console.error('Error playing video:', error);
//           });
//         };

//         videoElement.onerror = () => {
//           console.error('Error loading video.');
//         };

//         videoElement.onended = () => {
//           this.moveToNextContent();
//         };
//       }
//     } else {
//       if (imageElement) {
//         imageElement.src = this.getImageSource();
//         imageElement.style.display = 'block';
//         if (videoElement) videoElement.style.display = 'none';
//       }
//     }
//   }

//   moveToNextContent() {
//     this.currentImageDataIndex++;
//     this.displayMedia();
//   }

//   getImageSource(): string {
//     const currentImageData = this.imageDataList[this.currentImageDataIndex];
//     if (!currentImageData) return '';

//     const mimeType = currentImageData.Base64File.mimeType;
//     return `data:${mimeType};base64,${currentImageData.Base64File.data}`;
//   }

//   isImageType(): boolean {
//     const currentImageData = this.imageDataList[this.currentImageDataIndex];
//     const mimeType = currentImageData ? currentImageData.Base64File.mimeType : '';
//     return ['image/jpeg', 'image/png', 'image/gif'].includes(mimeType);
//   }

//   isVideoType(): boolean {
//     const currentImageData = this.imageDataList[this.currentImageDataIndex];
//     const mimeType = currentImageData ? currentImageData.Base64File.mimeType : '';
//     return ['video/mp4', 'video/webm', 'video/ogg'].includes(mimeType);
//   }
// }
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ScreenService } from '../screen-service/screen-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';

@Component({
  selector: 'app-display-screen',
  templateUrl: './display-screen.component.html',
  styleUrls: ['./display-screen.component.css'],
})
export class DisplayScreenComponent implements OnInit {
  public imageDataList: any[] = [];
  public currentImageDataIndex: number = 0;
  public animate: boolean = false;
  public showText: boolean = false;
  public showMedia: boolean = false;
  public textData: any;
  private textDisplayDuration: number = 5000;

  constructor(
    private route: ActivatedRoute,
    private screenService: ScreenService,
    private sanitizer: DomSanitizer
  ) {}

  ngOnInit() {
    const screenId = this.route.snapshot.paramMap.get('screenId');
    if (screenId) {
      this.fetchScreenDisplay(screenId);
      this.fetchScreenTextData(screenId);
    } else {
      console.error('No screen ID found in route parameters.');
    }
  }

  fetchScreenDisplay(screenId: string) {
    this.screenService.getScreenDisplay(screenId).pipe(
      catchError((error) => {
        console.error('Error fetching screen display data:', error);
        return of(null); // Return null to continue the observable chain
      })
    ).subscribe(
      (data: any) => {
        if (data && data.data && data.data.length > 0) {
          this.imageDataList = data.data;
        }
      }
    );
  }

  fetchScreenTextData(screenId: string) {
    this.screenService.getScreenTextData(screenId).pipe(
      catchError((error) => {
        console.error('Error fetching text data:', error);
        return of(null); // Return null to continue the observable chain
      })
    ).subscribe(
      (textData) => {
        this.textData = textData;
        this.startDisplayingContent(); // Start the display cycle
      }
    );
  }

  startDisplayingContent() {
    this.displayText();
  }

  displayText() {
    this.showText = true;
    this.showMedia = false;
    setTimeout(() => {
      this.showText = false;
      this.currentImageDataIndex = 0; // Reset to start of media list
      this.displayMedia();
    }, this.textDisplayDuration);
  }

  displayMedia() {
    if (this.currentImageDataIndex >= this.imageDataList.length) {
      this.startDisplayingContent(); // Restart the cycle
      return;
    }

    this.showText = false;
    this.showMedia = true;
    this.animate = true;

    this.showFullScreenImage();

    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    const mediaDisplayInterval = parseInt(currentImageData.Duration) * 1000;

    if (this.isImageType()) {
      setTimeout(() => {
        this.animate = false; // Toggle animate to apply fade-out
        setTimeout(() => {
          this.moveToNextContent();
        }, 500); // Wait for fade-out animation to complete
      }, mediaDisplayInterval);
    }
  }

  showFullScreenImage() {
    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    if (!currentImageData) return;

    const isVideo = this.isVideoType();
    const videoElement = document.getElementById('videoElement') as HTMLVideoElement;
    const imageElement = document.getElementById('imageElement') as HTMLImageElement;

    if (isVideo) {
      if (videoElement) {
        videoElement.src = this.getImageSource();
        videoElement.style.display = 'block';
        if (imageElement) imageElement.style.display = 'none';

        videoElement.onloadeddata = () => {
          videoElement.play().catch(error => {
            console.error('Error playing video:', error);
          });
        };

        videoElement.onerror = () => {
          console.error('Error loading video.');
        };

        videoElement.onended = () => {
          this.moveToNextContent();
        };
      }
    } else {
      if (imageElement) {
        imageElement.src = this.getImageSource();
        imageElement.style.display = 'block';
        if (videoElement) videoElement.style.display = 'none';
      }
    }
  }

  moveToNextContent() {
    this.currentImageDataIndex++;
    this.displayMedia();
  }

  getImageSource(): string {
    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    if (!currentImageData) return '';

    const mimeType = currentImageData.Base64File.mimeType;
    return `data:${mimeType};base64,${currentImageData.Base64File.data}`;
  }

  isImageType(): boolean {
    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    const mimeType = currentImageData ? currentImageData.Base64File.mimeType : '';
    return ['image/jpeg', 'image/png', 'image/gif'].includes(mimeType);
  }

  isVideoType(): boolean {
    const currentImageData = this.imageDataList[this.currentImageDataIndex];
    const mimeType = currentImageData ? currentImageData.Base64File.mimeType : '';
    return ['video/mp4', 'video/webm', 'video/ogg'].includes(mimeType);
  }
}
