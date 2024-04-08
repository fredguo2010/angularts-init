import { HttpContext } from '@angular/common/http';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  Optional,
  ViewChild
} from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { StartupService } from '@core';
import { ReuseTabService } from '@delon/abc/reuse-tab';
import { ALLOW_ANONYMOUS, DA_SERVICE_TOKEN, ITokenService, SocialOpenType, SocialService } from '@delon/auth';
import { SettingsService, _HttpClient } from '@delon/theme';
import { environment } from '@env/environment';
import { KeycloakService } from 'keycloak-angular';
import { KeycloakProfile } from 'keycloak-js';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTabChangeEvent } from 'ng-zorro-antd/tabs';
import { finalize } from 'rxjs/operators';
import { RaCaptcha } from 'src/app/services/captcha';

@Component({
  selector: 'passport-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less'],
  providers: [SocialService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserLoginComponent implements OnDestroy, AfterViewInit {
  constructor(
    fb: FormBuilder,
    private router: Router,
    private settingsService: SettingsService,
    private socialService: SocialService,
    @Optional()
    @Inject(ReuseTabService)
    private reuseTabService: ReuseTabService,
    @Inject(DA_SERVICE_TOKEN) private tokenService: ITokenService,
    private startupSrv: StartupService,
    public http: _HttpClient,
    public msg: NzMessageService,
    private cdr: ChangeDetectorRef,
    private readonly keycloak: KeycloakService
  ) {
    this.form = fb.group({
      userName: [null, [Validators.required, Validators.minLength(3)]],
      password: [null, [Validators.required, Validators.minLength(6)]],
      mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]],
      captcha: [null, [this.iscaptchaequals.bind(this)]],
      remember: [true]
    });
  }

  captchaCompen: any;

  // 默认打开图片验证
  captchaEnabled = environment.captchaEnabled;
  //captchaEnabled: boolean = true;
  ngAfterViewInit(): void {
    this.captchaCompen = new RaCaptcha(this.canvasElement.nativeElement);
    this.captchaCompen.generate(
      5,
      RaCaptcha.numbers + RaCaptcha.lowercaseAlphabet + RaCaptcha.uppercaseAlphabet,
      { font: 'consolas', size: 60, style: 'bold' },
      15,
      70
    );
  }

  @ViewChild('canvas', { static: true }) canvasElement: any;
  // #region fields

  get userName(): AbstractControl {
    return this.form.get('userName')!;
  }
  get password(): AbstractControl {
    return this.form.get('password')!;
  }
  get mobile(): AbstractControl {
    return this.form.get('mobile')!;
  }
  get captcha(): AbstractControl {
    return this.form.get('captcha')!;
  }

  form: FormGroup;
  error = '';
  type = 0;
  loading = false;

  // #region get captcha

  count = 0;
  interval$: any;

  // #endregion

  switch({ index }: NzTabChangeEvent): void {
    this.type = index!;
  }

  // #region social

  public isLoggedIn = false;
  public userProfile: KeycloakProfile | null = null;

  public login() {
    this.keycloak.login();
  }

  public logout() {
    this.keycloak.logout();
  }

  // #region
  // eslint-disable-next-line @angular-eslint/use-lifecycle-interface
  public async ngOnInit() {
    this.isLoggedIn = await this.keycloak.isLoggedIn();
    if (this.isLoggedIn) {
      this.userProfile = await this.keycloak.loadUserProfile();
      var cToken = await this.keycloak.getToken();

      this.http
        .get(
          `/Users/AuthByKeyCloakAndAutoGen`,
          { username: this.userProfile.username },
          {
            headers: { token: cToken },
            context: new HttpContext().set(ALLOW_ANONYMOUS, true)
          }
        )
        .subscribe(res => {
          res.nguser.token = cToken;
          res.ngtoken.token = cToken;

          this.settingsService.setUser(res.nguser);
          this.tokenService.set(res.ngtoken);
          this.startupSrv.load().subscribe(() => {
            let url = this.tokenService.referrer!.url || '/';

            if (url.includes('/passport')) {
              url = '/';
            }
            this.router.navigateByUrl(url);
          });
        });
    }
  }
  // #endregion

  getCaptcha(): void {
    this.captchaCompen.generate(
      5,
      RaCaptcha.numbers + RaCaptcha.lowercaseAlphabet + RaCaptcha.uppercaseAlphabet,
      { font: 'consolas', size: 50, style: 'bold' },
      15,
      70
    );
  }

  iscaptchaequals = (control: FormControl) => {
    if (control.value != null) {
      if (this.captchaCompen.check(control.value)) {
        return null;
      } else {
        return { iscaptchaequals: false };
      }
    }
    return { iscaptchaequals: false };
  };

  // #endregion

  submit(): void {
    this.error = '';
    if (this.type === 0) {
      this.userName.markAsDirty();
      this.userName.updateValueAndValidity();
      this.password.markAsDirty();
      this.password.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.userName.invalid || this.password.invalid || (this.captchaEnabled && this.captcha.invalid)) {
        return;
      }
    } else {
      this.mobile.markAsDirty();
      this.mobile.updateValueAndValidity();
      this.captcha.markAsDirty();
      this.captcha.updateValueAndValidity();
      if (this.mobile.invalid || (this.captchaEnabled && this.captcha.invalid)) {
        return;
      }
    }

    // 默认配置中对所有HTTP请求都会强制 [校验](https://ng-alain.com/auth/getting-started) 用户 Token
    // 然一般来说登录请求不需要校验，因此可以在请求URL加上：`/login?_allow_anonymous=true` 表示不触发用户 Token 校验
    this.loading = true;
    this.cdr.detectChanges();
    this.http
      .post(
        'Users/Authenticate',
        {
          username: this.userName.value,
          password: this.password.value
        },
        null,
        {
          context: new HttpContext().set(ALLOW_ANONYMOUS, true)
        }
      )
      .pipe(
        finalize(() => {
          this.loading = true;
          this.cdr.detectChanges();
        })
      )
      .subscribe(res => {
        if (!res.isok) {
          this.error = res.message;
          this.cdr.detectChanges();
          return;
        }
        // 清空路由复用信息
        this.reuseTabService.clear();
        // 设置用户Token信息
        // TODO: Mock expired value
        this.settingsService.setUser(res.nguser);

        //res.user.expired = +new Date() + 1000 * 60 * 1;

        this.tokenService.set(res.nguser);
        // 重新获取 StartupService 内容，我们始终认为应用信息一般都会受当前用户授权范围而影响
        this.startupSrv.load().subscribe(() => {
          let url = this.tokenService.referrer!.url || '/';
          if (url.includes('/passport')) {
            url = '/';
          }
          this.router.navigateByUrl(url);
        });
      });
  }

  // #region social

  // open(type: string, openType: SocialOpenType = 'href'): void {
  //   let url = ``;
  //   let callback = ``;
  //   if (environment.production) {
  //     callback = `https://ng-alain.github.io/ng-alain/#/passport/callback/${type}`;
  //   } else {
  //     callback = `http://localhost:4200/#/passport/callback/${type}`;
  //   }
  //   switch (type) {
  //     case 'auth0':
  //       url = `https://www.raftis.cn:7070/auth/realms/raiad/protocol/openid-connect/auth?response_type=code&client_id=rahistngalain&redirect_uri=${decodeURIComponent(
  //         callback
  //       )}`;
  //       break;
  //     case 'github':
  //       url = `//github.com/login/oauth/authorize?client_id=9d6baae4b04a23fcafa2&response_type=code&redirect_uri=${decodeURIComponent(
  //         callback
  //       )}`;
  //       break;
  //     case 'weibo':
  //       url = `https://api.weibo.com/oauth2/authorize?client_id=1239507802&response_type=code&redirect_uri=${decodeURIComponent(callback)}`;
  //       break;
  //   }
  //   if (openType === 'window') {
  //     this.socialService
  //       .login(url, '/', {
  //         type: 'window'
  //       })
  //       .subscribe(res => {
  //         if (res) {
  //           console.log(res);
  //           this.settingsService.setUser(res);
  //           this.router.navigateByUrl('/');
  //         }
  //       });
  //   } else {
  //     this.socialService.login(url, '/', {
  //       type: 'href'
  //     });
  //   }
  // }

  // #endregion

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
