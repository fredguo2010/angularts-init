import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileSummaryComponent } from './summary.component';

describe('MobileSummaryComponent', () => {
  let component: MobileSummaryComponent;
  let fixture: ComponentFixture<MobileSummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
