import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CookingTipDetailComponent } from './cooking-tip-detail.component';

describe('CookingTipDetailComponent', () => {
  let component: CookingTipDetailComponent;
  let fixture: ComponentFixture<CookingTipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CookingTipDetailComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CookingTipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
