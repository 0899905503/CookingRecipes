import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminManagermentComponent } from './admin-managerment.component';

describe('AdminManagermentComponent', () => {
  let component: AdminManagermentComponent;
  let fixture: ComponentFixture<AdminManagermentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminManagermentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminManagermentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
