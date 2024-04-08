import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysuserComponent } from './sysuser.component';

describe('SysSysuserComponent', () => {
  let component: SysSysuserComponent;
  let fixture: ComponentFixture<SysSysuserComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysuserComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysuserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
