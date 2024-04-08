import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { CofcoCofcositeViewComponent } from './view.component';

describe('CofcoCofcositeViewComponent', () => {
  let component: CofcoCofcositeViewComponent;
  let fixture: ComponentFixture<CofcoCofcositeViewComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ CofcoCofcositeViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CofcoCofcositeViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
