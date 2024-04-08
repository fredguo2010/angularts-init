import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDashboardcComponent } from './dashboardc.component';

describe('DashboardDashboardcComponent', () => {
  let component: DashboardDashboardcComponent;
  let fixture: ComponentFixture<DashboardDashboardcComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardDashboardcComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDashboardcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
