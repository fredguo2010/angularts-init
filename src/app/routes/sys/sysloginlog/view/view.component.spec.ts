import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysloginlogViewComponent } from './view.component';

describe('SysSysloginlogViewComponent', () => {
  let component: SysSysloginlogViewComponent;
  let fixture: ComponentFixture<SysSysloginlogViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysloginlogViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysloginlogViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
