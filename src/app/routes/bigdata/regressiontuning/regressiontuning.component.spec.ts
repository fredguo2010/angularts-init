import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BigdataRegressiontuningComponent } from './regressiontuning.component';

describe('BigdataRegressiontuningComponent', () => {
  let component: BigdataRegressiontuningComponent;
  let fixture: ComponentFixture<BigdataRegressiontuningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BigdataRegressiontuningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigdataRegressiontuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
