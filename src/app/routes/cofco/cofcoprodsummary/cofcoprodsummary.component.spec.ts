import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CofcoCofcoprodsummaryComponent } from './cofcoprodsummary.component';

describe('CofcoCofcoprodsummaryComponent', () => {
  let component: CofcoCofcoprodsummaryComponent;
  let fixture: ComponentFixture<CofcoCofcoprodsummaryComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CofcoCofcoprodsummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofcoCofcoprodsummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
