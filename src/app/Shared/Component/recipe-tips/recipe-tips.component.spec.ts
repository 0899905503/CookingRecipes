import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTipsComponent } from './recipe-tips.component';

describe('RecipeTipsComponent', () => {
  let component: RecipeTipsComponent;
  let fixture: ComponentFixture<RecipeTipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeTipsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeTipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
