import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysloginlogEditComponent } from './edit.component';

describe('SysSysloginlogEditComponent', () => {
  let component: SysSysloginlogEditComponent;
  let fixture: ComponentFixture<SysSysloginlogEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysloginlogEditComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysloginlogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
