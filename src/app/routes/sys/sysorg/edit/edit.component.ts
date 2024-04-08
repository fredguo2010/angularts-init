import { Component, OnInit, ViewChild } from '@angular/core';
import { SFComponent, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

@Component({
  selector: 'app-sys-sysorg-edit',
  templateUrl: './edit.component.html'
})
export class SysSysorgEditComponent implements OnInit {
  modaltitle: string = '新建';
  record: any = {};
  treeData: any = [];
  @ViewChild('sf', { static: false })
  private sf!: SFComponent;
  schema: SFSchema = {
    properties: {
      cOrgCode: { type: 'string', title: '编码', maxLength: 50 },
      cOrgName: { type: 'string', title: '名称' },
      cOrgType: { type: 'string', title: '类型' },
      cParentGuid: { type: 'string', title: '父项' },
      cHeadUserGuid: { type: 'string', title: '负责人', maxLength: 140 },
      iStatus: {
        type: 'integer',
        title: '状态',
        enum: [
          { label: '禁用', value: 0 },
          { label: '启用', value: 1 }
        ],
        default: 1
      }
    },
    required: ['cOrgCode', 'cOrgName', 'cOrgType']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    },
    $cOrgType: {
      widget: 'select',
      asyncData: () =>
        this.http.get(`/sys/sysdictionary/getall`, { cCategory: `生产单元类型` }).pipe(
          map(value => {
            const result: any[] = [];
            for (let i = 0; i < value.length; i++) {
              result.push({ label: value[i].cName, value: value[i].cValue });
            }
            return result;
          })
        )
    },
    $iStatus: {
      widget: 'select'
    },
    $cParentGuid: {
      widget: 'tree-select',
      allowClear: true,
      defaultExpandAll: false,
      virtualHeight: '200px',
      asyncData: () =>
        this.http.get(`/sys/sysorg/gettreenodes`).pipe(
          map(value => {
            return value.treeData;
          })
        )
    },
    $cHeadUserGuid: {
      widget: 'select',
      asyncData: () =>
        this.http.get(`/sys/user/getall`).pipe(
          map(value => {
            const result = [];
            for (let i = 0; i < value.length; i++) {
              if (value[i].cGuid != this.record.cHeadUserGuid) {
                result.push({ label: value[i].username, value: value[i].cGuid });
              }
            }
            return result;
          })
        )
    }
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  // selectonChange(value: { label: string; value: string }): void {
  //   console.log(value);
  // }
  ngOnInit(): void {
    if (this.record.cGuid != undefined) {
      this.modaltitle = `更新${this.record.cOrgName}`;
    }
  }

  save(value: any): void {
    if (this.record.cGuid == undefined) {
      this.http.post(`/sys/sysorg/add`, value).subscribe(res => {
        if (res.isok) {
          this.msgSrv.success('保存成功');
          this.modal.close(true);
        } else {
          this.msgSrv.error(res.message);
        }
      });
    } else {
      this.http.put(`/sys/sysorg/item/${this.record.cGuid}`, value).subscribe(res => {
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
