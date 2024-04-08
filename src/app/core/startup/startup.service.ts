import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { ACLService } from '@delon/acl';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { ALAIN_I18N_TOKEN, MenuService, SettingsService, TitleService } from '@delon/theme';
import type { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzIconService } from 'ng-zorro-antd/icon';
import { Observable, zip, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { ICONS } from '../../../style-icons';
import { ICONS_AUTO } from '../../../style-icons-auto';
import { I18NService } from '../i18n/i18n.service';

/**
 * Used for application startup
 * Generally used to get the basic data of the application, like: Menu Data, User Data, etc.
 */
@Injectable()
export class StartupService {
  constructor(
    iconSrv: NzIconService,
    private menuService: MenuService,
    @Inject(ALAIN_I18N_TOKEN) private i18n: I18NService,
    private settingService: SettingsService,
    private aclService: ACLService,
    private titleService: TitleService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private httpClient: HttpClient,
    private router: Router
  ) {
    iconSrv.addIcon(...ICONS_AUTO, ...ICONS);
  }

  private viaHttp(): Observable<void> {
    const defaultLang = this.i18n.defaultLang;
    const username = this.settingService.user.username;
    const userid = this.settingService.user.userid;
    const role = this.settingService.user.role;

    const token = localStorage.getItem('_token');
    if (token === 'undefined') {
      this.tokenService.clear();
      new Observable<void>();
    }
    if (!role) new Observable<void>();
    return zip(
      this.i18n.loadLangData(defaultLang),
      this.httpClient.get('../assets/tmp/app-data.json'),
      this.httpClient.get('Users/getmenutreenodesbyrolename', {
        params: {
          role: role ?? 'user'
        },
        context: new HttpContext().set(ALLOW_ANONYMOUS, true)
      }),
      this.httpClient.get('Users/getabilitybyrolename', {
        params: {
          role: role ?? 'user'
        },
        context: new HttpContext().set(ALLOW_ANONYMOUS, true)
      })
    ).pipe(
      catchError((res: NzSafeAny) => {
        console.warn(`StartupService.load: Network request failed`, res);
        setTimeout(() => this.router.navigateByUrl(`/exception/500`));
        return [];
      }),
      map(([langData, appData, menuData, abilityData]: [Record<string, string>, NzSafeAny, NzSafeAny, NzSafeAny]) => {
        // console.log(JSON.stringify(appData.menu));
        // console.log(JSON.stringify(menuData));
        // setting language data
        this.i18n.use(defaultLang, langData);

        // Application data
        // Application information: including site name, description, year
        this.settingService.setApp(appData.app);
        // User information: including name, avatar, email address
        //this.settingService.setUser(appData.user);
        // ACL: Set the permissions to full, https://ng-alain.com/acl/getting-started
        this.aclService.setFull(true);
        const roleArr: string[] = [role];
        this.aclService.setAbility(abilityData?.ability);
        this.aclService.attachRole(roleArr);
        // Menu data, https://ng-alain.com/theme/menu
        this.menuService.add([menuData?.MenuData]);
        // Can be set page suffix title, https://ng-alain.com/theme/title
        this.titleService.suffix = appData.app.name;
      })
    );
  }

  load(): Observable<void> {
    // http
    return this.viaHttp();
    // mock: Don’t use it in a production environment. ViaMock is just to simulate some data to make the scaffolding work normally
    // mock：请勿在生产环境中这么使用，viaMock 单纯只是为了模拟一些数据使脚手架一开始能正常运行
    //return this.viaMockI18n();
  }
}
