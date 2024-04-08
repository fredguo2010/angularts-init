import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysdictEditComponent } from './edit.component';

describe('SysSysdictEditComponent', () => {
  let component: SysSysdictEditComponent;
  let fixture: ComponentFixture<SysSysdictEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysdictEditComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysdictEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
