import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CofcoCofcoprodkpiComponent } from './cofcoprodkpi.component';

describe('CofcoCofcoprodkpiComponent', () => {
  let component: CofcoCofcoprodkpiComponent;
  let fixture: ComponentFixture<CofcoCofcoprodkpiComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CofcoCofcoprodkpiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofcoCofcoprodkpiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
