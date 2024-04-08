import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SettingsService, _HttpClient } from '@delon/theme';
import { MatchControl } from '@delon/util/form';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-sys-account-setting-security',
  templateUrl: './security.component.html'
})
export class SysAccountSettingSecurityComponent implements OnDestroy {
  constructor(
    fb: FormBuilder,
    private router: Router,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    public msg: NzMessageService,
    private settingService: SettingsService
  ) {
    this.form = fb.group(
      {
        // eslint-disable-next-line no-sparse-arrays
        orgpassword: [null, [Validators.required, Validators.minLength(6)]],
        password: [null, [Validators.required, Validators.minLength(6), SysAccountSettingSecurityComponent.checkPassword.bind(this)]],
        confirm: [null, [Validators.required, Validators.minLength(6)]]
      },
      {
        validators: MatchControl('password', 'confirm')
      }
    );
  }
  static checkPassword(control: FormControl): NzSafeAny {
    if (!control) {
      return null;
    }
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const self: any = this;
    self.visible = !!control.value;
    if (control.value && control.value.length > 9) {
      self.status = 'ok';
    } else if (control.value && control.value.length > 5) {
      self.status = 'pass';
    } else {
      self.status = 'pool';
    }

    if (self.visible) {
      self.progress = control.value.length * 10 > 100 ? 100 : control.value.length * 10;
    }
  }
  // #region fields
  get orgpassword(): AbstractControl {
    return this.form.controls.orgpassword;
  }
  get password(): AbstractControl {
    return this.form.controls.password;
  }
  get confirm(): AbstractControl {
    return this.form.controls.confirm;
  }

  form: FormGroup;
  error = '';
  type = 0;
  loading = false;
  visible = false;
  status = 'pool';

  namevisible = false;
  namestatus = 'pool';

  progress = 0;
  passwordProgressMap: { [key: string]: 'success' | 'normal' | 'exception' } = {
    ok: 'success',
    pass: 'normal',
    pool: 'exception'
  };

  // #endregion

  // #region get captcha

  count = 0;
  interval$: any;

  submit(): void {
    this.error = '';
    Object.keys(this.form.controls).forEach(key => {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    });
    console.log(this.form.invalid);
    if (this.form.invalid) {
      return;
    }
    const data = this.form.value;
    var upuser = { userid: '', orgpwd: '', newpwd: '' };
    upuser.userid = this.settingService.user.userid;
    upuser.orgpwd = data.orgpassword;
    upuser.newpwd = data.password;

    this.http.post('Users/SysUserUpdatePassWord', upuser).subscribe(res => {
      if (res.isok) {
        //新增成功
        this.msg.success('更新成功');
      } else {
        this.msg.error(`更新失败，${res.message}`);
      }
    });
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
