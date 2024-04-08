import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ACLGuard, ACLType } from '@delon/acl';

import { SysAccountSettingBaseComponent } from './account/setting/base/base.component';
import { SysAccountSettingSecurityComponent } from './account/setting/security/security.component';
import { SysAccountSettingComponent } from './account/setting/setting.component';
import { SysSysdictComponent } from './sysdict/sysdict.component';
import { SysSysexternalComponent } from './sysexternal/sysexternal.component';
import { SysSyslogComponent } from './syslog/syslog.component';
import { SysSysloginlogComponent } from './sysloginlog/sysloginlog.component';
import { SysSysmenuComponent } from './sysmenu/sysmenu.component';
import { SysSysorgComponent } from './sysorg/sysorg.component';
import { SysSysroleComponent } from './sysrole/sysrole.component';
import { SysSysuserComponent } from './sysuser/sysuser.component';

const routes: Routes = [
  {
    path: 'sysmenu',
    component: SysSysmenuComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['syssysmenu'] }
    }
  },
  {
    path: 'sysrole',
    component: SysSysroleComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['syssysrole'] }
    }
  },
  {
    path: 'sysorg',
    component: SysSysorgComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['syssysorg'] }
    }
  },
  {
    path: 'sysuser',
    component: SysSysuserComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['syssysuser'] }
    }
  },
  {
    path: 'sysdict',
    component: SysSysdictComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['syssysdict'] }
    }
  },
  {
    path: 'sysexternal',
    component: SysSysexternalComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['syssysexternal'] }
    }
  },
  {
    path: 'sysloginlog',
    component: SysSysloginlogComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['syssysloginlog'] }
    }
  },
  {
    path: 'syslog',
    component: SysSyslogComponent,
    canActivate: [ACLGuard],
    data: {
      guard: <ACLType>{ ability: ['syssyslog'] }
    }
  }, // 操作管理 },
  {
    path: 'account',
    children: [
      {
        path: 'setting',
        component: SysAccountSettingComponent,
        children: [
          { path: '', redirectTo: 'base', pathMatch: 'full' },
          {
            path: 'base',
            component: SysAccountSettingBaseComponent
          },
          {
            path: 'security',
            component: SysAccountSettingSecurityComponent
          }
        ]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SysRoutingModule {}
