import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-sysmenu-edit',
  templateUrl: './edit.component.html'
})
export class SysSysmenuEditComponent implements OnInit {
  modaltitle: string = '新建';
  record: any = {};
  schema: SFSchema = {
    properties: {
      text: { type: 'string', title: '菜单', maxLength: 50 },
      link: { type: 'string', title: '路由' },
      externalLink: { type: 'string', title: '外部Link' },
      target: {
        type: 'string',
        title: '打开方式',
        enum: [
          { label: '_self', value: '_self' },
          { label: '_blank', value: '_blank' },
          { label: '_parent', value: '_parent' },
          { label: '_top', value: '_top' }
        ],
        default: '_self'
      },
      i18n: { type: 'string', title: '翻译' },
      ability: { type: 'string', title: '系统ID' },
      icon: { type: 'string', title: '图标' },
      memo: { type: 'string', title: '备注', maxLength: 140 },
      status: {
        type: 'integer',
        title: '状态',
        enum: [
          { label: '禁用', value: 0 },
          { label: '启用', value: 1 }
        ],
        default: 1
      },
      sort: { type: 'integer', title: '排序数' },
      cParentGuid: { type: 'string', title: '父项' }
    },
    required: ['text', 'i18n', 'ability']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    },
    $text: {
      widget: 'string'
    },
    $link: {
      widget: 'string'
    },
    $status: {
      widget: 'select'
    },
    $cParentGuid: {
      widget: 'select',
      asyncData: () =>
        this.http.get(`/sys/sysmenu/getmenuparent`).pipe(
          map(value => {
            const result = [];
            for (let i = 0; i < value.length; i++) {
              if (value[i].cGuid != this.record.cGuid) {
                result.push({ label: value[i].text, value: value[i].cGuid });
              }
            }
            return result;
          })
        )
    }
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {
    if (this.record.text != undefined) {
      this.modaltitle = `更新${this.record.text}`;
    }
  }

  save(value: any): void {
    if (value.link != undefined && value.externalLink != undefined && value.link != '' && value.externalLink !== '') {
      this.msgSrv.warning('路由和外部Link不能同时存在');
      return;
    }
    if (this.record.cGuid != undefined) {
      this.http.put(`/sys/sysmenu/item/${this.record.cGuid}`, value).subscribe(res => {
        if (res.isok) {
          this.msgSrv.success('保存成功');
          this.modal.close(true);
        } else {
          this.msgSrv.error(res.message);
        }
      });
    } else {
      this.http.post(`/sys/sysmenu/add`, value).subscribe(res => {
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
