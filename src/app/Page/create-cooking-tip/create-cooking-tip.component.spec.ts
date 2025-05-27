import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCookingTipComponent } from './create-cooking-tip.component';

describe('CreateCookingTipComponent', () => {
  let component: CreateCookingTipComponent;
  let fixture: ComponentFixture<CreateCookingTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCookingTipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCookingTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
