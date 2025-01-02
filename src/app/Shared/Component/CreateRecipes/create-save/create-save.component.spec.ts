import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateSaveComponent } from './create-save.component';

describe('CreateSaveComponent', () => {
  let component: CreateSaveComponent;
  let fixture: ComponentFixture<CreateSaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateSaveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateSaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
