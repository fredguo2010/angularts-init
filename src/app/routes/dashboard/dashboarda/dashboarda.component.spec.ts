import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardDashboardaComponent } from './dashboarda.component';

describe('DashboardDashboardaComponent', () => {
  let component: DashboardDashboardaComponent;
  let fixture: ComponentFixture<DashboardDashboardaComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardDashboardaComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardDashboardaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
