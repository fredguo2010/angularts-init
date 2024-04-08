import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysroleEditComponent } from './edit.component';

describe('SysSysroleEditComponent', () => {
  let component: SysSysroleEditComponent;
  let fixture: ComponentFixture<SysSysroleEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysroleEditComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysroleEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
