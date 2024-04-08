import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SysSysorgViewComponent } from './view.component';

describe('SysSysorgViewComponent', () => {
  let component: SysSysorgViewComponent;
  let fixture: ComponentFixture<SysSysorgViewComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [SysSysorgViewComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(SysSysorgViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
