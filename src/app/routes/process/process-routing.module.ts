import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProcessProcesslistComponent } from './processlist/processlist.component';

const routes: Routes = [{ path: 'processlist', component: ProcessProcesslistComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessRoutingModule {}
