import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysorgEditComponent } from './edit.component';

describe('SysSysorgEditComponent', () => {
  let component: SysSysorgEditComponent;
  let fixture: ComponentFixture<SysSysorgEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysorgEditComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysorgEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
