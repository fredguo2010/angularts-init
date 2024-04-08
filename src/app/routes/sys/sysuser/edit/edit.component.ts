import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-sysuser-edit',
  templateUrl: './edit.component.html'
})
export class SysSysuserEditComponent implements OnInit {
  modaltitle: string = '新建';
  record: any = {};
  schema: SFSchema = {
    properties: {
      username: { type: 'string', title: '用户名' },
      lastname: { type: 'string', title: '姓', maxLength: 3 },
      firstname: { type: 'string', title: '名' },
      avatar: { type: 'string', title: '图片' },
      email: { type: 'string', title: '邮箱', maxLength: 140 },
      title: { type: 'string', title: '职位', maxLength: 140 },
      address: { type: 'string', title: '地址', maxLength: 140 },
      phone: { type: 'string', title: '电话', maxLength: 140 },
      role: {
        type: 'string',
        title: '角色',
        enum: [
          { label: 'admin', value: 'admin' },
          { label: 'user', value: 'user' }
        ]
      }
    },
    required: ['username', 'lastname', 'firstname', 'email', 'role']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    },
    $username: {
      widget: 'string'
    },
    $email: {
      widget: 'string'
    },
    $role: {
      widget: 'select',
      asyncData: () =>
        this.http.get(`/sys/sysrole/getall`).pipe(
          map(value => {
            const result = [];
            for (let i = 0; i < value.length; i++) {
              result.push({ label: value[i].cRoleName, value: value[i].cRoleName });
            }
            return result;
          })
        )
    }
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    if (this.record.userid != '') {
      this.modaltitle = `更新${this.record.username}`;
    }
  }

  save(value: any): void {
    this.http.put(`/Users/item/${this.record.cGuid}`, value, { userid: this.record.userid }).subscribe(res => {
      if (res.isok) {
        this.msgSrv.success('保存成功');
        this.modal.close(true);
      } else {
        this.msgSrv.error(res.message);
      }
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
