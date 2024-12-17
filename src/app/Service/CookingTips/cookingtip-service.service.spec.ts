import { TestBed } from '@angular/core/testing';

import { CookingtipServiceService } from './cookingtip-service.service';

describe('CookingtipServiceService', () => {
  let service: CookingtipServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookingtipServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
