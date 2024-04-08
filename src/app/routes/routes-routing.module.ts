import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SimpleGuard } from '@delon/auth';
import { environment } from '@env/environment';

// layout
import { LayoutBasicComponent } from '../layout/basic/basic.component';
import { LayoutBigdataComponent } from '../layout/bigdata/bigdata.component';
import { LayoutBlankComponent } from '../layout/blank/blank.component';
import { LayoutPassportComponent } from '../layout/passport/passport.component';
import { CofcoCofcomainComponent } from './cofco/cofcomain/cofcomain.component';
import { DashboardDashboardaComponent } from './dashboard/dashboarda/dashboarda.component';
import { DashboardDashboardbComponent } from './dashboard/dashboardb/dashboardb.component';
import { DashboardDashboardcComponent } from './dashboard/dashboardc/dashboardc.component';
import { DashboardOperatorComponent } from './dashboard/operator/operator.component';
// single pages
import { CallbackComponent } from './passport/callback.component';
import { UserLockComponent } from './passport/lock/lock.component';
// passport pages
import { UserLoginComponent } from './passport/login/login.component';
import { UserRegisterResultComponent } from './passport/register-result/register-result.component';
import { UserRegisterComponent } from './passport/register/register.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutBasicComponent,
    canActivate: [SimpleGuard],
    children: [
      { path: '', redirectTo: '/dashboard/main', pathMatch: 'full' },
      { path: 'exception', loadChildren: () => import('./exception/exception.module').then(m => m.ExceptionModule) },
      // 业务子模块
      // { path: 'widgets', loadChildren: () => import('./widgets/widgets.module').then(m => m.WidgetsModule) },
      { path: 'dashboard', loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule) },
      { path: 'sys', loadChildren: () => import('./sys/sys.module').then(m => m.SysModule) },
      { path: 'process', loadChildren: () => import('./process/process.module').then(m => m.ProcessModule) },
      { path: 'tinyorder', loadChildren: () => import('./tinyorder/tinyorder.module').then(m => m.TinyorderModule) },
      { path: 'cofco', loadChildren: () => import('./cofco/cofco.module').then(m => m.CofcoModule) },
      { path: 'device', loadChildren: () => import('./device/device.module').then(m => m.DeviceModule) },
      { path: 'ssls', loadChildren: () => import('./ssls/ssls.module').then(m => m.SslsModule) }
    ]
  },

  // 空白布局
  {
    path: 'tinyorder',
    // component: LayoutBlankComponent,
    children: [{ path: 'mobile', loadChildren: () => import('./tinyorder/mobile/mobile.module').then(m => m.MobileModule) }]
  },
  // bigdata
  {
    path: '',
    component: LayoutBigdataComponent,
    children: [{ path: 'bigdata', loadChildren: () => import('./bigdata/bigdata.module').then(m => m.BigdataModule) }]
  },
  // passport
  {
    path: 'passport',
    component: LayoutPassportComponent,
    children: [
      { path: 'login', component: UserLoginComponent, data: { title: '登录' } },
      { path: 'register', component: UserRegisterComponent, data: { title: '注册' } },
      { path: 'register-result', component: UserRegisterResultComponent, data: { title: '注册结果' } },
      { path: 'lock', component: UserLockComponent, data: { title: '锁屏' } }
    ]
  },
  {
    path: '',
    children: [
      { path: 'dboperator', component: DashboardOperatorComponent, data: { title: 'dboperator' } },
      { path: 'dashboarda', component: DashboardDashboardaComponent, data: { title: 'DashboardA' } },
      { path: 'dashboardb', component: DashboardDashboardbComponent, data: { title: 'DashboardB' } },
      { path: 'dashboardc', component: DashboardDashboardcComponent, data: { title: 'DashboardC' } },
      { path: 'cofcomain', component: CofcoCofcomainComponent, data: { title: '中粮生物主页' } }
    ]
  },
  // 单页不包裹Layout
  { path: 'passport/callback/:type', component: CallbackComponent },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      useHash: environment.useHash,
      // NOTICE: If you use `reuse-tab` component and turn on keepingScroll you can set to `disabled`
      // Pls refer to https://ng-alain.com/components/reuse-tab
      scrollPositionRestoration: 'top'
    })
  ],
  exports: [RouterModule]
})
export class RouteRoutingModule {}
