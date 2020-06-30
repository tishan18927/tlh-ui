import { TestBed } from '@angular/core/testing';

import { RoomDataShareService } from './room-data-share.service';

describe('RoomDataShareService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RoomDataShareService = TestBed.get(RoomDataShareService);
    expect(service).toBeTruthy();
  });
});
