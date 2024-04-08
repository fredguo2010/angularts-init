import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysdictViewComponent } from './view.component';

describe('SysSysdictViewComponent', () => {
  let component: SysSysdictViewComponent;
  let fixture: ComponentFixture<SysSysdictViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysdictViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysdictViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
