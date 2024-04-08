import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { MobileOrderdetailComponent } from './orderdetail.component';

describe('MobileOrderdetailComponent', () => {
  let component: MobileOrderdetailComponent;
  let fixture: ComponentFixture<MobileOrderdetailComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ MobileOrderdetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MobileOrderdetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
