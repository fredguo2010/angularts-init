import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSyslogEditComponent } from './edit.component';

describe('SysSyslogEditComponent', () => {
  let component: SysSyslogEditComponent;
  let fixture: ComponentFixture<SysSyslogEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSyslogEditComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSyslogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
