import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SettingsService, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadFile } from 'ng-zorro-antd/upload';
import { Observable, Observer, zip } from 'rxjs';

interface ProAccountSettingsUser {
  cGuid: string;
  username: string;
  lastname: string;
  firstname: string;
  avatar: string;
  email: string;
  signature: string;
  title: string;
  country: string;
  address: string;
  phone: string;
}

interface ProAccountSettingsCity {
  name: string;
  id: string;
}

@Component({
  selector: 'app-sys-account-setting-base',
  templateUrl: './base.component.html',
  styleUrls: ['./base.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SysAccountSettingBaseComponent implements OnInit {
  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private msg: NzMessageService,
    private settingService: SettingsService
  ) {
    this.cHeaders = { userid: this.settingService.user.userid };
  }
  avatar = '';
  userLoading = true;
  user!: ProAccountSettingsUser;

  cHeaders: any;
  // #region geo

  provinces: ProAccountSettingsCity[] = [];
  cities: ProAccountSettingsCity[] = [];

  ngOnInit(): void {
    this.http.get(`/Users/item/${this.settingService.user.userid}`).subscribe(res => {
      this.userLoading = false;
      this.user = res.data;
      this.cdr.detectChanges();
    });
    // zip(this.http.get('/user/current'), this.http.get('/geo/province')).subscribe(
    //   ([user, province]: [ProAccountSettingsUser, ProAccountSettingsCity[]]) => {
    //     this.userLoading = false;
    //     this.user = user;
    //     this.provinces = province;
    //     this.choProvince(user.geographic.province.key, false);
    //     this.cdr.detectChanges();
    //   }
    // );
  }

  beforeUpload = (file: NzUploadFile, _fileList: NzUploadFile[]): Observable<boolean> =>
    new Observable((observer: Observer<boolean>) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        this.msg.error('You can only upload JPG file!');
        observer.complete();
        return;
      }
      const isLt2M = file.size! / 1024 / 1024 < 2;
      if (!isLt2M) {
        this.msg.error('Image must smaller than 2MB!');
        observer.complete();
        return;
      }
      observer.next(isJpgOrPng && isLt2M);
      observer.complete();
    });

  private getBase64(img: File, callback: (img: string) => void): void {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result!.toString()));
    reader.readAsDataURL(img);
  }

  handleChange(info: { file: NzUploadFile }): void {
    switch (info.file.status) {
      case 'uploading':
        this.userLoading = true;
        break;
      case 'done':
        // Get this url from response in real world.
        // console.log(info);
        // this.getBase64(info.file!.originFileObj!, (img: string) => {
        // });
        this.user.avatar = `api/${info.file.response.file.path}`;
        this.userLoading = false;
        this.cdr.detectChanges();
        break;

      case 'error':
        this.msg.error('Network error');
        this.userLoading = false;
        break;
    }
  }
  // #endregion

  save(): boolean {
    this.http.put(`/Users/item/${this.user.cGuid}`, this.user, { userid: this.settingService.user.userid }).subscribe(res => {
      if (res.isok) {
        this.msg.success('保存成功');
        return true;
      } else {
        this.msg.error(res.message);
        return false;
      }
    });
    return false;
  }
}
