import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysuserEditComponent } from './edit.component';

describe('SysSysuserEditComponent', () => {
  let component: SysSysuserEditComponent;
  let fixture: ComponentFixture<SysSysuserEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysuserEditComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysuserEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
