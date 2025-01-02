import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNutrientComponent } from './create-nutrient.component';

describe('CreateNutrientComponent', () => {
  let component: CreateNutrientComponent;
  let fixture: ComponentFixture<CreateNutrientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateNutrientComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateNutrientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
