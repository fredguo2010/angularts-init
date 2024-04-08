import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BigdataHomeComponent } from './home.component';

describe('BigdataHomeComponent', () => {
  let component: BigdataHomeComponent;
  let fixture: ComponentFixture<BigdataHomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BigdataHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigdataHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
