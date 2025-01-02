import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCookingtipComponent } from './create-cookingtip.component';

describe('CreateCookingtipComponent', () => {
  let component: CreateCookingtipComponent;
  let fixture: ComponentFixture<CreateCookingtipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateCookingtipComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateCookingtipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
