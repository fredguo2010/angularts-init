import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysmenuEditComponent } from './edit.component';

describe('SysSysmenuEditComponent', () => {
  let component: SysSysmenuEditComponent;
  let fixture: ComponentFixture<SysSysmenuEditComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysmenuEditComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysmenuEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
