import { TestBed } from '@angular/core/testing';

import { ImageInLocalStorageService } from './image-in-local-storage.service';

describe('ImageInLocalStorageService', () => {
  let service: ImageInLocalStorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImageInLocalStorageService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
