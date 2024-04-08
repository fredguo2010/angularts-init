import { NgModule, Type } from '@angular/core';
import { OnboardingModule } from '@delon/abc/onboarding';
import { QuickMenuModule } from '@delon/abc/quick-menu';
import { SharedModule } from '@shared';
import { NzAffixModule } from 'ng-zorro-antd/affix';
import { NzBackTopModule } from 'ng-zorro-antd/back-top';
import { NzInputNumberModule } from 'ng-zorro-antd/input-number';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NgxEchartsModule } from 'ngx-echarts';

import { MobileRoutingModule } from './mobile-routing.module';
import { MobileOrderComponent } from './order/order.component';
import { MobileClockonComponent } from './orderdetail/clockon/clockon.component';
import { MobileOrderdetailComponent } from './orderdetail/orderdetail.component';
import { MobileSummaryComponent } from './summary/summary.component';

const COMPONENTS: Array<Type<void>> = [MobileOrderComponent, MobileOrderdetailComponent, MobileClockonComponent, MobileSummaryComponent];

@NgModule({
  imports: [
    SharedModule,
    MobileRoutingModule,
    NzStepsModule,
    NzTagModule,
    QuickMenuModule,
    NzAffixModule,
    NzBackTopModule,
    NzInputNumberModule,
    NgxEchartsModule,
    OnboardingModule
  ],
  declarations: COMPONENTS
})
export class MobileModule {}
