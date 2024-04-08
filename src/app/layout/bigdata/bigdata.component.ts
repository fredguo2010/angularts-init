import { Component, Inject } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, ActivationEnd, NavigationEnd, Router, RoutesRecognized } from '@angular/router';
import { DA_SERVICE_TOKEN, ITokenService } from '@delon/auth';
import { MenuService, SettingsService, TitleService, User } from '@delon/theme';
import { LayoutDefaultOptions } from '@delon/theme/layout-default';
import { environment } from '@env/environment';
import { filter, map } from 'rxjs';

@Component({
  selector: 'layout-bigdata',
  template: `
    <nz-layout>
      <nz-header class="header">
        <div nz-row nzGutter="24">
          <div nz-col nzSpan="3">
            <a href="#/passport/login" target="_self">
              <img src="./assets/logo-full.svg" />
            </a>
          </div>
          <div nz-col nzSpan="18" style="text-align: center">
            <div class="headertxt">{{ atitle }} </div>
          </div>
          <div nz-col nzSpan="3" class="headertxt">
            <a href="#/passport/login" target="_self" style="color:#fff">
              <i nz-icon nzType="question-circle"></i>
            </a>
          </div>
        </div>
      </nz-header>
      <nz-content><router-outlet style=""></router-outlet></nz-content>
      <global-footer [links]="links"> RA ROCKII ©2022 Implemented By IAD </global-footer>
    </nz-layout>
  `,
  styles: [
    `
      .logo {
        background-image: url('../../../assets/logo-full.svg');
        background-repeat: no-repeat;
        background-position: center 10px;
        background-size: 100%;
      }
      .header {
        padding: 0px;
        background: linear-gradient(90deg, #e45231 0%, #cd163f 100%);
        box-shadow: 0px 1px 6px 0px rgba(0, 0, 0, 0.12);
      }

      .headertxt {
        color: #ffffff;
        font-weight: bold;
        font-size: 22px;
        margin: 0 auto;
        text-align: center;
      }
    `
  ]
})
export class LayoutBigdataComponent {
  options: LayoutDefaultOptions = {
    logoExpanded: `./assets/logo-full.svg`,
    logoCollapsed: `./assets/logo.svg`,
    hideAside: true,
    logoLink: `/passport/login`
  };
  searchToggleStatus = false;
  showSettingDrawer = !environment.production;
  links = [
    {
      title: '沪ICP备17029432号-2',
      href: 'https://beian.miit.gov.cn/'
    }
  ];
  atitle: string | null = '';
  get user(): User {
    return this.settings.user;
  }

  get token(): any {
    return this.tokenService.get()?.token;
  }

  constructor(private router: Router, private settings: SettingsService, @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService) {
    this.router.events.subscribe(event => {
      this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd),
          map(() => {
            let route: ActivatedRoute = this.router.routerState.root;
            let routeTitle = '';
            while (route!.firstChild) {
              route = route.firstChild;
            }
            if (route.snapshot.data['title']) {
              routeTitle = route!.snapshot.data['title'];
            }
            return routeTitle;
          })
        )
        .subscribe((title: string) => {
          if (title) {
            this.atitle = title;
          }
        });
    });
  }
}
