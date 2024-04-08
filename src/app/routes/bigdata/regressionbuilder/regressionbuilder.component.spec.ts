import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BigdataRegressionbuilderComponent } from './regressionbuilder.component';

describe('BigdataRegressionbuilderComponent', () => {
  let component: BigdataRegressionbuilderComponent;
  let fixture: ComponentFixture<BigdataRegressionbuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BigdataRegressionbuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigdataRegressionbuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
