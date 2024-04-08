import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BigdataCategoryinputComponent } from './categoryinput.component';

describe('BigdataCategoryinputComponent', () => {
  let component: BigdataCategoryinputComponent;
  let fixture: ComponentFixture<BigdataCategoryinputComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BigdataCategoryinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigdataCategoryinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
