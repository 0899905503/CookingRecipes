import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingTipComponent } from './cooking-tip.component';

describe('CookingTipComponent', () => {
  let component: CookingTipComponent;
  let fixture: ComponentFixture<CookingTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookingTipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookingTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
