import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';
import { SslsRoutingModule } from './ssls-routing.module';
import { SslsSlicesimComponent } from './slicesim/slicesim.component';

const COMPONENTS: Type<void>[] = [
  SslsSlicesimComponent];

@NgModule({
  imports: [
    SharedModule,
    SslsRoutingModule
  ],
  declarations: COMPONENTS,
})
export class SslsModule { }
