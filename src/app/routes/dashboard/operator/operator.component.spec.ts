import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardOperatorComponent } from './operator.component';

describe('DashboardOperatorComponent', () => {
  let component: DashboardOperatorComponent;
  let fixture: ComponentFixture<DashboardOperatorComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [DashboardOperatorComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardOperatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
