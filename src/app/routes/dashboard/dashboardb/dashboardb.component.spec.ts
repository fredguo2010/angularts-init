import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDashboardbComponent } from './dashboardb.component';

describe('DashboardDashboardbComponent', () => {
  let component: DashboardDashboardbComponent;
  let fixture: ComponentFixture<DashboardDashboardbComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardDashboardbComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDashboardbComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
