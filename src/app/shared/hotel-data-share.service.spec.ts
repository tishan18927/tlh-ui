import { TestBed } from '@angular/core/testing';

import { HotelDataShareService } from './hotel-data-share.service';

describe('HotelDataShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: HotelDataShareService = TestBed.get(HotelDataShareService);
    expect(service).toBeTruthy();
  });
});
