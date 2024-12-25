import { TestBed } from '@angular/core/testing';

import { CookingTipService } from './cooking-tip.service';

describe('CookingTipService', () => {
  let service: CookingTipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CookingTipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
