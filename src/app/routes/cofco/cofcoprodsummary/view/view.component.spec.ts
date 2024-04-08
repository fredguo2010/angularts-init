import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CofcoCofcoprodsummaryViewComponent } from './view.component';

describe('CofcoCofcoprodsummaryViewComponent', () => {
  let component: CofcoCofcoprodsummaryViewComponent;
  let fixture: ComponentFixture<CofcoCofcoprodsummaryViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CofcoCofcoprodsummaryViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofcoCofcoprodsummaryViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
