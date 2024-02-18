import { TestBed } from '@angular/core/testing';

import { Pdf2imageService } from './pdf2image.service';

describe('Pdf2imageService', () => {
  let service: Pdf2imageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Pdf2imageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
