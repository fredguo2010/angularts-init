import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DeviceDevicelistComponent } from './devicelist/devicelist.component';
import { DeviceDevicelistTagsComponent } from './devicelist/tags/tags.component';

const routes: Routes = [
  { path: 'devicelist', component: DeviceDevicelistComponent },
  { path: 'tags', component: DeviceDevicelistTagsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DeviceRoutingModule {}
