import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateUploadimageComponent } from './create-uploadimage.component';

describe('CreateUploadimageComponent', () => {
  let component: CreateUploadimageComponent;
  let fixture: ComponentFixture<CreateUploadimageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateUploadimageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateUploadimageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
