import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAccountSettingBaseComponent } from './base.component';

describe('SysAccountSettingBaseComponent', () => {
  let component: SysAccountSettingBaseComponent;
  let fixture: ComponentFixture<SysAccountSettingBaseComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysAccountSettingBaseComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysAccountSettingBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
