import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACLGuard, ACLType } from '@delon/acl';

import { CofcoCofcomainComponent } from './cofcomain/cofcomain.component';
import { CofcoCofcoprodkpiComponent } from './cofcoprodkpi/cofcoprodkpi.component';
import { CofcoCofcoprodsummaryComponent } from './cofcoprodsummary/cofcoprodsummary.component';
import { CofcoCofcositeComponent } from './cofcosite/cofcosite.component';

const routes: Routes = [
  // {
  //   path: 'cofcomain',
  //   component: CofcoCofcomainComponent,
  //   data: { title: '中粮生物主页' }
  // },
  {
    path: 'cofcosite',
    component: CofcoCofcositeComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['cofcocofcosite'] }
    }
  },
  {
    path: 'cofcoprodsummary',
    component: CofcoCofcoprodsummaryComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['cofcocofcoprodsummary'] }
    }
  },
  {
    path: 'cofcoprodkpi',
    component: CofcoCofcoprodkpiComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['cofcocofcoprodkpi'] }
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CofcoRoutingModule {}
