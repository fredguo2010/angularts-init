import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';
import { DeviceDevicelistTagsComponent } from './tags.component';

describe('DeviceDevicelistTagsComponent', () => {
  let component: DeviceDevicelistTagsComponent;
  let fixture: ComponentFixture<DeviceDevicelistTagsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DeviceDevicelistTagsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeviceDevicelistTagsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
