import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { SysOrgchartComponent } from './orgchart.component';

describe('SysOrgchartComponent', () => {
  let component: SysOrgchartComponent;
  let fixture: ComponentFixture<SysOrgchartComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ SysOrgchartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SysOrgchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
