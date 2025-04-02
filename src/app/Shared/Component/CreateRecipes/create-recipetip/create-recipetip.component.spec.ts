import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreateRecipetipComponent } from './create-recipetip.component';

describe('CreateCookingtipComponent', () => {
  let component: CreateRecipetipComponent;
  let fixture: ComponentFixture<CreateRecipetipComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateRecipetipComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CreateRecipetipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
