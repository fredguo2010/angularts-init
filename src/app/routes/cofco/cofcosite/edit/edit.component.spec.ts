import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CofcoCofcositeEditComponent } from './edit.component';

describe('CofcoCofcositeEditComponent', () => {
  let component: CofcoCofcositeEditComponent;
  let fixture: ComponentFixture<CofcoCofcositeEditComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CofcoCofcositeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofcoCofcositeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
