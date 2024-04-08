import { HttpContext } from '@angular/common/http';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ALLOW_ANONYMOUS } from '@delon/auth';
import { _HttpClient } from '@delon/theme';
import { MatchControl } from '@delon/util/form';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'passport-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserRegisterComponent implements OnDestroy {
  constructor(
    fb: FormBuilder,
    private router: Router,
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    public msg: NzMessageService
  ) {
    this.form = fb.group(
      {
        // eslint-disable-next-line no-sparse-arrays
        username: [null, , [this.userexists()]],
        mail: [null, [Validators.required, Validators.email]],
        password: [null, [Validators.required, Validators.minLength(6), UserRegisterComponent.checkPassword.bind(this)]],
        confirm: [null, [Validators.required, Validators.minLength(6)]],
        mobilePrefix: ['+86'],
        mobile: [null, [Validators.required, Validators.pattern(/^1\d{10}$/)]]
      },
      {
        validators: MatchControl('password', 'confirm')
      }
    );
  }

  // #region fields

  get username(): AbstractControl {
    return this.form.controls.username;
  }

  get mail(): AbstractControl {
    return this.form.controls.mail;
  }
  get password(): AbstractControl {
    return this.form.controls.password;
  }
  get confirm(): AbstractControl {
    return this.form.controls.confirm;
  }
  get mobile(): AbstractControl {
    return this.form.controls.mobile;
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
  public userexists(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const value = control.value;
      this.namevisible = !!control.value;
      if (!value) {
        this.namevisible = false;
        return {
          valid: false,
          required: true
        };
      } else {
        return this.http
          .get(
            'Users/UserExists',
            { username: control.value },
            {
              context: new HttpContext().set(ALLOW_ANONYMOUS, true)
            }
          )
          .toPromise()
          .then(res => {
            console.log(res);
            if (res.isok) {
              this.namestatus = 'nameexists';
              return Promise.resolve({
                valid: false,
                type: 'repeat'
              });
            } else if (control.value.length < 3) {
              this.namestatus = 'pool';
              return Promise.resolve({
                valid: false,
                type: 'repeat'
              });
            } else {
              this.namestatus = 'ok';
            }
            return null;
          });
      }
    };
  }

  // #endregion

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

    this.http
      .get(
        'Users/UserExists',
        { username: this.username.value },
        {
          context: new HttpContext().set(ALLOW_ANONYMOUS, true)
        }
      )
      .subscribe(res => {
        if (res.isok) {
          this.msg.warning(res.message);
          return;
        } else {
          const data = this.form.value;
          var reguser = { username: '', email: '', password: '', phone: '' };
          reguser.username = data.username;
          reguser.email = data.mail;
          reguser.password = data.password;
          reguser.phone = data.mobilePrefix + data.mobile;

          this.http
            .post('Users/UserRegister', reguser, null, {
              context: new HttpContext().set(ALLOW_ANONYMOUS, true)
            })
            .subscribe(res => {
              if (!!res && res.isok) {
                //新增成功
                this.router.navigate(['/passport/register-result'], {
                  queryParams: { username: data.username }
                });
              } else {
                this.msg.error('注册失败，请检查');
              }
            });
        }
      });
  }

  ngOnDestroy(): void {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
  }
}
