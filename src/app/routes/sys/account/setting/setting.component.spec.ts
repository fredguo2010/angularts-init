import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysAccountSettingComponent } from './setting.component';

describe('SysAccountSettingComponent', () => {
  let component: SysAccountSettingComponent;
  let fixture: ComponentFixture<SysAccountSettingComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysAccountSettingComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysAccountSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
