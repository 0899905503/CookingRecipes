import { TestBed } from '@angular/core/testing';

import { CookingtoolService } from './cookingtool.service';

describe('CookingtoolService', () => {
  let service: CookingtoolService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookingtoolService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
