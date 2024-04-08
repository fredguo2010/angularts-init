import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { MobileModule } from './mobile/mobile.module';
import { TinyorderRoutingModule } from './tinyorder-routing.module';

const COMPONENTS: Array<Type<void>> = [];

@NgModule({
  imports: [SharedModule, TinyorderRoutingModule, MobileModule],
  declarations: COMPONENTS
})
export class TinyorderModule {}
