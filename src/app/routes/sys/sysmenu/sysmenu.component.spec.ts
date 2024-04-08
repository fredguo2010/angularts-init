import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysmenuComponent } from './sysmenu.component';

describe('SysSysmenuComponent', () => {
  let component: SysSysmenuComponent;
  let fixture: ComponentFixture<SysSysmenuComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysmenuComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysmenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
