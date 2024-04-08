import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileClockonComponent } from './clockon.component';

describe('MobileClockonComponent', () => {
  let component: MobileClockonComponent;
  let fixture: ComponentFixture<MobileClockonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileClockonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileClockonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
