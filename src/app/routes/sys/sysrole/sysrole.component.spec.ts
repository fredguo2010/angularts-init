import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysroleComponent } from './sysrole.component';

describe('SysSysroleComponent', () => {
  let component: SysSysroleComponent;
  let fixture: ComponentFixture<SysSysroleComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysroleComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysroleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
