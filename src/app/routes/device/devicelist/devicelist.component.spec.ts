import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceDevicelistComponent } from './devicelist.component';

describe('DeviceDevicelistComponent', () => {
  let component: DeviceDevicelistComponent;
  let fixture: ComponentFixture<DeviceDevicelistComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDevicelistComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDevicelistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
