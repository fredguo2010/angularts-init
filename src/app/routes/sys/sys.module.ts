import { NgModule, Type } from '@angular/core';
import { SharedModule } from '@shared';

import { SysAccountSettingBaseComponent } from './account/setting/base/base.component';
import { SysAccountSettingSecurityComponent } from './account/setting/security/security.component';
import { SysAccountSettingComponent } from './account/setting/setting.component';
import { SysRoutingModule } from './sys-routing.module';
import { SysSysdictEditComponent } from './sysdict/edit/edit.component';
import { SysSysdictComponent } from './sysdict/sysdict.component';
import { SysSysdictViewComponent } from './sysdict/view/view.component';
import { SysSysexternalComponent } from './sysexternal/sysexternal.component';
import { SysSyslogEditComponent } from './syslog/edit/edit.component';
import { SysSyslogComponent } from './syslog/syslog.component';
import { SysSyslogViewComponent } from './syslog/view/view.component';
import { SysSysloginlogEditComponent } from './sysloginlog/edit/edit.component';
import { SysSysloginlogComponent } from './sysloginlog/sysloginlog.component';
import { SysSysloginlogViewComponent } from './sysloginlog/view/view.component';
import { SysSysmenuEditComponent } from './sysmenu/edit/edit.component';
import { SysSysmenuComponent } from './sysmenu/sysmenu.component';
import { SysSysmenuViewComponent } from './sysmenu/view/view.component';
import { SysSysorgEditComponent } from './sysorg/edit/edit.component';
import { SysOrgchartComponent } from './sysorg/orgchart/orgchart.component';
import { SysSysorgComponent } from './sysorg/sysorg.component';
import { SysSysorgViewComponent } from './sysorg/view/view.component';
import { SysSysroleEditComponent } from './sysrole/edit/edit.component';
import { SysSysroleComponent } from './sysrole/sysrole.component';
import { SysSysroleViewComponent } from './sysrole/view/view.component';
import { SysSysuserEditComponent } from './sysuser/edit/edit.component';
import { SysSysuserComponent } from './sysuser/sysuser.component';
import { SysSysuserViewComponent } from './sysuser/view/view.component';
const COMPONENTS: Array<Type<void>> = [
  SysSysmenuComponent,
  SysSysmenuEditComponent,
  SysSysmenuViewComponent,
  SysSysroleComponent,
  SysSysroleEditComponent,
  SysSysroleViewComponent,
  SysSysorgComponent,
  SysSysorgEditComponent,
  SysSysorgViewComponent,
  SysSysuserComponent,
  SysSysuserEditComponent,
  SysSysuserViewComponent,
  SysSysdictComponent,
  SysSysdictEditComponent,
  SysSysdictViewComponent,
  SysSyslogComponent,
  SysSysloginlogComponent,
  SysSysloginlogComponent,
  SysSysloginlogEditComponent,
  SysSysloginlogViewComponent,
  SysSyslogComponent,
  SysSyslogEditComponent,
  SysSyslogViewComponent,
  SysAccountSettingComponent,
  SysAccountSettingBaseComponent,
  SysAccountSettingSecurityComponent,
  SysSysexternalComponent,
  SysOrgchartComponent
];

@NgModule({
  imports: [SharedModule, SysRoutingModule],
  declarations: COMPONENTS
})
export class SysModule {}
