import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { BigdataCategorytuningComponent } from './categorytuning.component';

describe('BigdataCategorytuningComponent', () => {
  let component: BigdataCategorytuningComponent;
  let fixture: ComponentFixture<BigdataCategorytuningComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BigdataCategorytuningComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BigdataCategorytuningComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
