import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { SFComponent, SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cofco-cofcoprodsummary-edit',
  templateUrl: './edit.component.html'
})
export class CofcoCofcoprodsummaryEditComponent implements OnInit, AfterViewInit {
  modaltitle: string = '新建';
  record: any = {};
  treeData: any = [];
  @ViewChild('sf', { static: false })
  private sf!: SFComponent;
  schema: SFSchema = {
    properties: {
      dDate: { type: 'string', title: '日期', format: 'date' },
      cOrgGuid: { type: 'string', title: '企业', maxLength: 50 },
      cAssetGuid: { type: 'string', title: '装置' },
      cProduct: { type: 'string', title: '产品' },
      iProd: { type: 'number', title: '产量（吨）' },
      iLoad: { type: 'number', title: '负荷%' },
      cMemo: { type: 'string', title: '备注' }
    },
    required: ['cOrgGuid', 'cAssetGuid', 'cProduct', 'iProd', 'iLoad']
  };
  ui: SFUISchema = {
    '*': {
      spanLabelFixed: 100,
      grid: { span: 12 }
    },
    $dDate: {
      widget: 'date'
    },
    $cOrgGuid: {
      widget: 'tree-select',
      defaultExpandAll: false,
      virtualHeight: '200px',
      asyncData: () =>
        this.http.get(`/sys/sysorg/getcompanytreenodes`).pipe(
          map(value => {
            return value.treeData;
          })
        ),
      change: (cParentGuid: any) => this.updateAsset(cParentGuid)
    },
    $cAssetGuid: {
      widget: 'select'
    }
  };

  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}
  ngAfterViewInit(): void {
    if (this.record.cGuid != undefined) {
      const assetProperty = this.sf.getProperty('/cAssetGuid')!;
      this.http.get(`/sys/sysorg/getbyparentid`, { cParentGuid: this.record.cOrgGuid }).subscribe(res => {
        const items = res.data.map((value: { cOrgName: any; cGuid: any }) => {
          return { label: value.cOrgName, value: value.cGuid };
        });
        assetProperty.schema.enum = items;
        assetProperty.widget.reset(this.record.cAssetGuid);
      });
    }
  }

  // selectonChange(value: { label: string; value: string }): void {
  //   console.log(value);
  // }
  ngOnInit(): void {
    if (this.record.cGuid != undefined) {
      this.modaltitle = `更新${this.record.cOrgName}`;
    }
  }

  updateAsset(cParentGuid: any): void {
    const assetProperty = this.sf.getProperty('/cAssetGuid')!;
    this.http.get(`/sys/sysorg/getbyparentid`, { cParentGuid: cParentGuid }).subscribe(res => {
      const items = res.data.map((value: { cOrgName: any; cGuid: any }) => {
        return { label: value.cOrgName, value: value.cGuid };
      });
      assetProperty.schema.enum = items;
      assetProperty.widget.reset(items || items[0]);
    });
  }

  save(value: any): void {
    if (this.record.cGuid == undefined) {
      this.http
        .get('/cofco/prodsummary/getbyDateAssetAndProduct', {
          dDate: format(new Date(value.dDate), 'yyyy-MM-dd'),
          cAssetGuid: value.cAssetGuid,
          cProduct: value.cProduct
        })
        .subscribe(resAl => {
          if (resAl.length < 1) {
            this.http.post(`/cofco/prodsummary/add`, value).subscribe(res => {
              if (res.isok) {
                this.msgSrv.success('保存成功');
                this.modal.close(true);
              } else {
                this.msgSrv.error(res.message);
              }
            });
          } else {
            this.msgSrv.error('同一天不允许有相同产品记录！');
          }
        });
    } else {
      this.http.put(`/cofco/prodsummary/item/${this.record.cGuid}`, value).subscribe(res => {
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
