import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BigdataRegressioninputComponent } from './regressioninput.component';

describe('BigdataRegressioninputComponent', () => {
  let component: BigdataRegressioninputComponent;
  let fixture: ComponentFixture<BigdataRegressioninputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BigdataRegressioninputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigdataRegressioninputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
