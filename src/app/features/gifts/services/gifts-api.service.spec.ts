import { TestBed } from '@angular/core/testing';

import { GiftsApiService } from './gifts-api.service';

describe('GiftsApiService', () => {
  let service: GiftsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GiftsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
