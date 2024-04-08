import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysuserViewComponent } from './view.component';

describe('SysSysuserViewComponent', () => {
  let component: SysSysuserViewComponent;
  let fixture: ComponentFixture<SysSysuserViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysuserViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysuserViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
