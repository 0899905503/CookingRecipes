import { TestBed } from '@angular/core/testing';

import { RecipeTipService } from './recipe-tip.service';

describe('RecipeTipService', () => {
  let service: RecipeTipService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RecipeTipService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
