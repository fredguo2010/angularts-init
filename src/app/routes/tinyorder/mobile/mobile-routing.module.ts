import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MobileOrderComponent } from './order/order.component';
import { MobileOrderdetailComponent } from './orderdetail/orderdetail.component';
import { MobileSummaryComponent } from './summary/summary.component';

const routes: Routes = [
  { path: 'order', component: MobileOrderComponent, data: { title: '工单' } },
  { path: 'orderdetail', component: MobileOrderdetailComponent },
  { path: 'summary', component: MobileSummaryComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MobileRoutingModule {}
