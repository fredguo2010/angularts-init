import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzImageModule } from 'ng-zorro-antd/image';

import { ProcessRoutingModule } from './process-routing.module';
import { ProcessProcesslistComponent } from './processlist/processlist.component';
const COMPONENTS: Array<Type<void>> = [ProcessProcesslistComponent];

@NgModule({
  imports: [SharedModule, ProcessRoutingModule, NzDescriptionsModule, NzImageModule],
  declarations: COMPONENTS
})
export class ProcessModule {}
