import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAnalysisComponent } from './analysis.component';

describe('DashboardAnalysisComponent', () => {
  let component: DashboardAnalysisComponent;
  let fixture: ComponentFixture<DashboardAnalysisComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardAnalysisComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
