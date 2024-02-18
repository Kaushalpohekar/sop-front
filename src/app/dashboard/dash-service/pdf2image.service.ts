import { Injectable } from '@angular/core';
import * as pdfjs from 'pdfjs-dist';

@Injectable({
  providedIn: 'root'
})
export class Pdf2imageService {

  constructor() { }
  async convertPdfToImages(pdfFile: File): Promise<string[]> {
    const fileReader = new FileReader();
    const pdfData = await new Promise<ArrayBuffer>((resolve, reject) => {
      fileReader.onload = (e) => resolve(e.target?.result as ArrayBuffer);
      fileReader.onerror = (e) => reject(e);
      fileReader.readAsArrayBuffer(pdfFile);
    });

    const pdfDocument = await pdfjs.getDocument({ data: pdfData }).promise;

    const images: string[] = [];
    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const scale = 1.5;
      const viewport = page.getViewport({ scale });

      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');
      canvas.height = viewport.height;
      canvas.width = viewport.width;

      const renderContext = {
        canvasContext: context!,
        viewport: viewport
      };

      await page.render(renderContext).promise;

      const imageDataUrl = canvas.toDataURL('image/png');
      images.push(imageDataUrl);
    }

    return images;
  }
  
}
