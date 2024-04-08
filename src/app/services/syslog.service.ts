import { Injectable } from '@angular/core';
import { SettingsService, _HttpClient } from '@delon/theme';

@Injectable({
  providedIn: 'root'
})
export class SyslogService {
  constructor(public http: _HttpClient, private settingService: SettingsService) {}

  savelog(value: any): void {
    value.dTimeStamp = new Date();
    value.cUserId = this.settingService.user.userid;
    value.cUserName = this.settingService.user.username;
    this.http.post(`/sys/syslog/add`, value).subscribe(res => {});
  }
}
