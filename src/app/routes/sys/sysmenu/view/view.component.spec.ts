import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysmenuViewComponent } from './view.component';

describe('SysSysmenuViewComponent', () => {
  let component: SysSysmenuViewComponent;
  let fixture: ComponentFixture<SysSysmenuViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysmenuViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysmenuViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
