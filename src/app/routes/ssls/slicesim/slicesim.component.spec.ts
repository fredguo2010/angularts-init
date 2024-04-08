import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { SslsSlicesimComponent } from './slicesim.component';

describe('SslsSlicesimComponent', () => {
  let component: SslsSlicesimComponent;
  let fixture: ComponentFixture<SslsSlicesimComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [SslsSlicesimComponent]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SslsSlicesimComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
