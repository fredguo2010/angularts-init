import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { SettingsService, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { SyslogService } from 'src/app/services/syslog.service';

@Component({
  selector: 'app-sys-sysdict-edit',
  templateUrl: './edit.component.html'
})
export class SysSysdictEditComponent implements OnInit {
  modaltitle: string = '新建';
  record: any = {};
  schema: SFSchema = {
    properties: {
      cName: { type: 'string', title: '项目名称', maxLength: 50 },
      cValue: { type: 'string', title: '项目值' },
      cCategory: { type: 'string', title: '分类' },
      iStatus: {
        type: 'integer',
        title: '状态',
        enum: [
          { label: '禁用', value: 0 },
          { label: '启用', value: 1 }
        ],
        default: 1
      },
      cMemo: { type: 'string', title: '描述' }
    },
    required: ['cName', 'cValue', 'cCategory']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    },
    $iStatus: {
      widget: 'select'
    },
    $cMemo: {
      widget: 'textarea',
      grid: { span: 12 },
      autosize: { minRows: 2, maxRows: 6 }
    }
  };

  constructor(
    private modal: NzModalRef,
    private msgSrv: NzMessageService,
    public http: _HttpClient,
    private settingService: SettingsService,
    private sysLogs: SyslogService
  ) {}

  ngOnInit(): void {
    if (this.record.userid != '') {
      this.modaltitle = `更新${this.record.username}`;
    }
  }

  save(value: any, needClose: boolean): void {
    if (this.record.cGuid == undefined) {
      value.cCreateUserId = this.settingService.user.userid;
      value.cCreateUserName = this.settingService.user.username;
      value.dCreateTime = new Date();

      this.http.post(`/sys/sysdictionary/add`, value).subscribe(res => {
        if (res.isok) {
          this.msgSrv.success('Save Success');
          if (needClose) {
            this.modal.close(true);
          }
        } else {
          this.msgSrv.error(res.cErrorMessage);
        }

        this.sysLogs.savelog({
          cModule: 'sysdict',
          cActionType: 'create',
          cObjectValue: value.cName,
          cDescription: `sysdictionary add  ${value.cName}`
        });
      });
    } else {
      value.cModifyUserId = this.settingService.user.userid;
      value.cModifyUserName = this.settingService.user.username;
      value.dModifyTime = new Date();
      this.http.put(`/sys/sysdictionary/item/${this.record.cGuid}`, value).subscribe(res => {
        if (res.isok) {
          this.msgSrv.success('Save Success');

          this.sysLogs.savelog({
            cModule: 'sysdict',
            cActionType: 'update',
            cObjectValue: value.cGuid,
            cDescription: `sysdictionary update  ${this.record.cGuid}`
          });
          if (needClose) {
            this.modal.close(true);
          }
        } else {
          this.msgSrv.error(res.message);
        }
      });
    }
  }

  close(): void {
    this.modal.destroy();
  }
}
