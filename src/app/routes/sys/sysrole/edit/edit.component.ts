import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-sys-sysrole-edit',
  templateUrl: './edit.component.html'
})
export class SysSysroleEditComponent implements OnInit {
  record: any = {};
  i: any;
  schema: SFSchema = {
    properties: {
      cRoleCode: { type: 'string', title: '编码' },
      cRoleName: { type: 'string', title: '角色', maxLength: 15 },
      cDescription: { type: 'string', title: '描述' }
    },
    required: ['cRoleCode', 'cRoleName']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    }
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    console.log(1);
  }

  save(value: any): void {
    console.log(this.record.cGuid);
    if (this.record.cGuid == undefined) {
      this.http.post(`/sys/sysrole/add`, value).subscribe(res => {
        console.log(res);
        if (res.isok) {
          this.msgSrv.success('保存成功');
          this.modal.close(true);
        } else {
          this.msgSrv.error(res.message);
        }
      });
    } else {
      this.http.put(`/sys/sysrole/item/${this.record._id}`, value).subscribe(res => {
        if (res.isok) {
          this.msgSrv.success('保存成功');
          this.modal.close(true);
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
