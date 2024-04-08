import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysexternalComponent } from './sysexternal.component';

describe('SysSysexternalComponent', () => {
  let component: SysSysexternalComponent;
  let fixture: ComponentFixture<SysSysexternalComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysexternalComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysexternalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
