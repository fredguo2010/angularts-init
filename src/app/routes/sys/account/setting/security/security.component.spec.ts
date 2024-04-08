import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAccountSettingSecurityComponent } from './security.component';

describe('SysAccountSettingSecurityComponent', () => {
  let component: SysAccountSettingSecurityComponent;
  let fixture: ComponentFixture<SysAccountSettingSecurityComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysAccountSettingSecurityComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysAccountSettingSecurityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
