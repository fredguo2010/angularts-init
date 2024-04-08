import { NgModule, Type } from '@angular/core';
import { CountDownModule } from '@delon/abc/count-down';
import { EllipsisModule } from '@delon/abc/ellipsis';
import { OnboardingModule } from '@delon/abc/onboarding';
import { QuickMenuModule } from '@delon/abc/quick-menu';
import { G2BarModule } from '@delon/chart/bar';
import { G2CardModule } from '@delon/chart/card';
import { G2GaugeModule } from '@delon/chart/gauge';
import { G2MiniAreaModule } from '@delon/chart/mini-area';
import { G2MiniBarModule } from '@delon/chart/mini-bar';
import { G2MiniProgressModule } from '@delon/chart/mini-progress';
import { NumberInfoModule } from '@delon/chart/number-info';
import { G2PieModule } from '@delon/chart/pie';
import { G2RadarModule } from '@delon/chart/radar';
import { G2SingleBarModule } from '@delon/chart/single-bar';
import { G2TagCloudModule } from '@delon/chart/tag-cloud';
import { G2TimelineModule } from '@delon/chart/timeline';
import { TrendModule } from '@delon/chart/trend';
import { G2WaterWaveModule } from '@delon/chart/water-wave';
import { SharedModule } from '@shared';
import { CountdownModule } from 'ngx-countdown';
import { NgxEchartsModule } from 'ngx-echarts';

import { DashboardAnalysisComponent } from './analysis/analysis.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardDashboardaComponent } from './dashboarda/dashboarda.component';
import { DashboardDashboardbComponent } from './dashboardb/dashboardb.component';
import { DashboardDashboardcComponent } from './dashboardc/dashboardc.component';
import { DashboardMainComponent } from './main/main.component';
import { DashboardOperatorComponent } from './operator/operator.component';

const COMPONENTS: Array<Type<void>> = [
  DashboardMainComponent,
  DashboardAnalysisComponent,
  DashboardOperatorComponent,
  DashboardDashboardaComponent,
  DashboardDashboardbComponent,
  DashboardDashboardcComponent
];

@NgModule({
  imports: [
    SharedModule,
    DashboardRoutingModule,
    CountDownModule,
    CountdownModule,
    G2BarModule,
    G2CardModule,
    G2GaugeModule,
    NgxEchartsModule,
    G2MiniAreaModule,
    G2MiniBarModule,
    G2MiniProgressModule,
    G2PieModule,
    G2RadarModule,
    G2SingleBarModule,
    G2TagCloudModule,
    G2TimelineModule,
    G2WaterWaveModule,
    EllipsisModule,
    NumberInfoModule,
    TrendModule,
    QuickMenuModule,
    OnboardingModule
  ],
  declarations: COMPONENTS
})
export class DashboardModule {}
