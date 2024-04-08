import { Component, OnInit, ViewChild } from '@angular/core';
import { SFComponent, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cofco-cofcoprodkpi-edit',
  templateUrl: './edit.component.html'
})
export class CofcoCofcoprodkpiEditComponent implements OnInit {
  modaltitle: string = '新建';
  record: any = {};
  treeData: any = [];
  @ViewChild('sf', { static: false })
  private sf!: SFComponent;
  schema: SFSchema = {
    properties: {
      cOrgName: { type: 'string', title: '企业' },
      cKPIType: { type: 'string', title: '指标分类' },
      cKPIFactor: { type: 'string', title: '项目指标' },
      cKPIFactorDesc: { type: 'string', title: '指标释义' },
      cKPIFactorUnit: { type: 'string', title: '单位' },
      dDate: { type: 'string', title: '日期', format: 'date' },
      iKPI: { type: 'number', title: 'KPI' },
      cMemo: { type: 'string', title: '备注' }
    },
    required: ['iKPI']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    },
    $dDate: {
      widget: 'date'
    },
    $cOrgName: {
      widget: 'text'
    },
    $cKPIType: {
      widget: 'text'
    },
    $cKPIFactor: {
      widget: 'text'
    },
    $cKPIFactorDesc: {
      widget: 'text'
    },
    $cKPIFactorUnit: {
      widget: 'text'
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
      this.http.post(`/cofco/prodsummary/add`, value).subscribe(res => {
        if (res.isok) {
          this.msgSrv.success('保存成功');
          this.modal.close(true);
        } else {
          this.msgSrv.error(res.message);
        }
      });
    } else {
      this.http
        .put(`/cofco/prodkpi/item/${this.record.cGuid}`, {
          iKPI: value.iKPI
        })
        .subscribe(res => {
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
