import { TestBed } from '@angular/core/testing';

import { WishesApiService } from './wishes-api.service';

describe('WishesApiService', () => {
  let service: WishesApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WishesApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
