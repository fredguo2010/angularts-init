import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysroleViewComponent } from './view.component';

describe('SysSysroleViewComponent', () => {
  let component: SysSysroleViewComponent;
  let fixture: ComponentFixture<SysSysroleViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysroleViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysroleViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
