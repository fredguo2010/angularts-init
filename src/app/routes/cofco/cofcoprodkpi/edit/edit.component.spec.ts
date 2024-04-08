import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CofcoCofcoprodkpiEditComponent } from './edit.component';

describe('CofcoCofcoprodkpiEditComponent', () => {
  let component: CofcoCofcoprodkpiEditComponent;
  let fixture: ComponentFixture<CofcoCofcoprodkpiEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CofcoCofcoprodkpiEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofcoCofcoprodkpiEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
