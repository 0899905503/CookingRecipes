import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeTitleComponent } from './recipe-title.component';

describe('RecipeTitleComponent', () => {
  let component: RecipeTitleComponent;
  let fixture: ComponentFixture<RecipeTitleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeTitleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeTitleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
