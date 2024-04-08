import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysorgComponent } from './sysorg.component';

describe('SysSysorgComponent', () => {
  let component: SysSysorgComponent;
  let fixture: ComponentFixture<SysSysorgComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysorgComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysorgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
