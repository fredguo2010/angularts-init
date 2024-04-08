import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysdictComponent } from './sysdict.component';

describe('SysSysdictComponent', () => {
  let component: SysSysdictComponent;
  let fixture: ComponentFixture<SysSysdictComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysdictComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysdictComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
