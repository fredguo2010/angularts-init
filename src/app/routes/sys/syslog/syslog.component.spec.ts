import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSyslogComponent } from './syslog.component';

describe('SysSyslogComponent', () => {
  let component: SysSyslogComponent;
  let fixture: ComponentFixture<SysSyslogComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSyslogComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSyslogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
