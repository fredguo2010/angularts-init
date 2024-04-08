import { Component, OnInit } from '@angular/core';
import { SFSchema, SFUISchema } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';

@Component({
  selector: 'app-mobile-clockon',
  templateUrl: './clockon.component.html'
})
export class MobileClockonComponent implements OnInit {
  record: any = {};
  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, public http: _HttpClient) {}

  ngOnInit(): void {}

  save(value: any): void {}

  submit(event: any): void {
    if (this.record.iQtyBad + this.record.iQtyGood > this.record.iPlanQty) {
      this.msgSrv.error('合格数量+报废数量，不允许大于计划数量');
      return;
    }

    // this.record.iQtyGood = this.iQtyGood;
    // this.record.iQtyBad = this.iQtyBad;

    this.http.put(`/mes/mesworkorderdetail/item/${this.record.cGuid}?_allow_anonymous=true`, this.record).subscribe(res => {
      if (res.isok) {
        this.msgSrv.success('报工成功');
        this.modal.close(true);
      } else {
        this.msgSrv.success(`失败,${res.cErrorMessage}`);
      }
    });
  }

  close(): void {
    this.modal.destroy();
  }
}
