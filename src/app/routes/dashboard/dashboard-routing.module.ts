import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DashboardAnalysisComponent } from './analysis/analysis.component';
import { DashboardDashboardaComponent } from './dashboarda/dashboarda.component';
import { DashboardDashboardbComponent } from './dashboardb/dashboardb.component';
import { DashboardDashboardcComponent } from './dashboardc/dashboardc.component';
import { DashboardMainComponent } from './main/main.component';
import { DashboardOperatorComponent } from './operator/operator.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard/main', pathMatch: 'full' },
  { path: 'main', component: DashboardMainComponent },
  { path: 'analysis', component: DashboardAnalysisComponent },
  { path: 'operator', component: DashboardOperatorComponent },
  { path: 'dashboarda', component: DashboardDashboardaComponent },
  { path: 'dashboardb', component: DashboardDashboardbComponent },
  { path: 'dashboardc', component: DashboardDashboardcComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule {}
