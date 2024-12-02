import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTipComponent } from './recipe-tip.component';

describe('RecipeTipComponent', () => {
  let component: RecipeTipComponent;
  let fixture: ComponentFixture<RecipeTipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeTipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeTipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
