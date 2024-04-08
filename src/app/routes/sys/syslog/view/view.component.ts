import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sys-syslog-view',
  templateUrl: './view.component.html'
})
export class SysSyslogViewComponent {
  record: any = {};

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, private http: _HttpClient) {}

  close(): void {
    this.modal.destroy();
  }
}
