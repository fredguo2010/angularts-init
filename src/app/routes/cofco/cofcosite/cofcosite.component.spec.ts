import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CofcoCofcositeComponent } from './cofcosite.component';

describe('CofcoCofcositeComponent', () => {
  let component: CofcoCofcositeComponent;
  let fixture: ComponentFixture<CofcoCofcositeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CofcoCofcositeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofcoCofcositeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
