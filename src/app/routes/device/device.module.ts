import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { NgxEchartsModule } from 'ngx-echarts';

import { DeviceRoutingModule } from './device-routing.module';
import { DeviceDevicelistComponent } from './devicelist/devicelist.component';
import { DeviceDevicelistTagsComponent } from './devicelist/tags/tags.component';

const COMPONENTS: Array<Type<void>> = [DeviceDevicelistComponent, DeviceDevicelistTagsComponent];

@NgModule({
  imports: [NgxEchartsModule, SharedModule, DeviceRoutingModule],
  declarations: COMPONENTS
})
export class DeviceModule {}
