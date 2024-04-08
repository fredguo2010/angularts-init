import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BigdataCategorybuilderComponent } from './categorybuilder.component';

describe('BigdataCategorybuilderComponent', () => {
  let component: BigdataCategorybuilderComponent;
  let fixture: ComponentFixture<BigdataCategorybuilderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BigdataCategorybuilderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigdataCategorybuilderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
