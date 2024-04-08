import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CofcoCofcomainComponent } from './cofcomain.component';

describe('CofcoCofcomainComponent', () => {
  let component: CofcoCofcomainComponent;
  let fixture: ComponentFixture<CofcoCofcomainComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CofcoCofcomainComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofcoCofcomainComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
