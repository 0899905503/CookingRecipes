import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipeMainComponent } from './recipe-main.component';

describe('RecipeMainComponent', () => {
  let component: RecipeMainComponent;
  let fixture: ComponentFixture<RecipeMainComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RecipeMainComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RecipeMainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
