import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CofcoCofcoprodkpiViewComponent } from './view.component';

describe('CofcoCofcoprodkpiViewComponent', () => {
  let component: CofcoCofcoprodkpiViewComponent;
  let fixture: ComponentFixture<CofcoCofcoprodkpiViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CofcoCofcoprodkpiViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofcoCofcoprodkpiViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
