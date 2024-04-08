import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSyslogViewComponent } from './view.component';

describe('SysSyslogViewComponent', () => {
  let component: SysSyslogViewComponent;
  let fixture: ComponentFixture<SysSyslogViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSyslogViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSyslogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
