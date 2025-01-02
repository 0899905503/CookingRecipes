import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCookingtoolComponent } from './create-cookingtool.component';

describe('CreateCookingtoolComponent', () => {
  let component: CreateCookingtoolComponent;
  let fixture: ComponentFixture<CreateCookingtoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCookingtoolComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCookingtoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
