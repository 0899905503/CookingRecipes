import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingpageComponent } from './settingpage.component';

describe('SettingpageComponent', () => {
  let component: SettingpageComponent;
  let fixture: ComponentFixture<SettingpageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingpageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SettingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
