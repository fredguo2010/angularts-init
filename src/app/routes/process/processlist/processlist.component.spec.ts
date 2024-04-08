import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProcessProcesslistComponent } from './processlist.component';

describe('ProcessProcesslistComponent', () => {
  let component: ProcessProcesslistComponent;
  let fixture: ComponentFixture<ProcessProcesslistComponent>;

  beforeEach(
    waitForAsync(() => {
      TestBed.configureTestingModule({
        declarations: [ProcessProcesslistComponent]
      }).compileComponents();
    })
  );

  beforeEach(() => {
    fixture = TestBed.createComponent(ProcessProcesslistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
