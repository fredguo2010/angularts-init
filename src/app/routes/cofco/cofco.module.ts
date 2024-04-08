import { NgModule, Type } from '@angular/core';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { QuickMenuModule } from '@delon/abc/quick-menu';
import { G2MiniBarModule } from '@delon/chart/mini-bar';
import { G2MiniProgressModule } from '@delon/chart/mini-progress';
import { SharedModule } from '@shared';
import { NzCarouselModule } from 'ng-zorro-antd/carousel';
import { NgxEchartsModule } from 'ngx-echarts';

import { CofcoRoutingModule } from './cofco-routing.module';
import { CofcoCofcomainComponent } from './cofcomain/cofcomain.component';
import { CofcoCofcoprodkpiComponent } from './cofcoprodkpi/cofcoprodkpi.component';
import { CofcoCofcoprodkpiEditComponent } from './cofcoprodkpi/edit/edit.component';
import { CofcoCofcoprodkpiViewComponent } from './cofcoprodkpi/view/view.component';
import { CofcoCofcoprodsummaryComponent } from './cofcoprodsummary/cofcoprodsummary.component';
import { CofcoCofcoprodsummaryEditComponent } from './cofcoprodsummary/edit/edit.component';
import { CofcoCofcoprodsummaryViewComponent } from './cofcoprodsummary/view/view.component';
import { CofcoCofcositeComponent } from './cofcosite/cofcosite.component';
import { CofcoCofcositeEditComponent } from './cofcosite/edit/edit.component';
import { CofcoCofcositeViewComponent } from './cofcosite/view/view.component';
const COMPONENTS: Array<Type<void>> = [
  CofcoCofcomainComponent,
  CofcoCofcositeComponent,
  CofcoCofcositeEditComponent,
  CofcoCofcositeViewComponent,
  CofcoCofcoprodsummaryComponent,
  CofcoCofcoprodsummaryEditComponent,
  CofcoCofcoprodsummaryViewComponent,
  CofcoCofcoprodkpiComponent,
  CofcoCofcoprodkpiEditComponent,
  CofcoCofcoprodkpiViewComponent
];

@NgModule({
  imports: [
    SharedModule,
    CofcoRoutingModule,
    NgxEchartsModule,
    NzCarouselModule,
    QuickMenuModule,
    EllipsisModule,
    G2MiniBarModule,
    G2MiniProgressModule
  ],
  declarations: COMPONENTS
})
export class CofcoModule {}
