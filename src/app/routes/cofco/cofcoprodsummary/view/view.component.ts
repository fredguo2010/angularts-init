import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalRef } from 'ng-zorro-antd/modal';
@Component({
  selector: 'app-cofco-cofcoprodsummary-view',
  templateUrl: './view.component.html'
})
export class CofcoCofcoprodsummaryViewComponent implements OnInit {
  record: any = {};
  i: any;
  dDate: string = '';
  constructor(private modal: NzModalRef, private msgSrv: NzMessageService, private http: _HttpClient) {}

  ngOnInit(): void {
    console.log(this.record.dDate);
    this.dDate = format(new Date(this.record.dDate), 'yyyy-MM-dd');
  }

  close(): void {
    this.modal.destroy();
  }
}
