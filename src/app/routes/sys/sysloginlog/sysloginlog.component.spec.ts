import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysloginlogComponent } from './sysloginlog.component';

describe('SysSysloginlogComponent', () => {
  let component: SysSysloginlogComponent;
  let fixture: ComponentFixture<SysSysloginlogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysloginlogComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysloginlogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
