import { TestBed } from '@angular/core/testing';

import { CreateRecipeDataService } from './create-recipe-data.service';

describe('CreateRecipeDataService', () => {
  let service: CreateRecipeDataService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateRecipeDataService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
