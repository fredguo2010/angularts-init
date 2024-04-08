import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, RouterLinkActive } from '@angular/router';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

import { MobileClockonComponent } from './clockon/clockon.component';

@Component({
  selector: 'app-mobile-orderdetail',
  templateUrl: './orderdetail.component.html',
  styleUrls: ['./orderdetail.component.less'],
  host: {
    '[class.alain-ms__console-full]': 'true'
  }
})
export class MobileOrderdetailComponent implements OnInit {
  gridStyle = {
    width: '100%',
    textAlign: 'center'
  };
  cGuid: string = '';

  loading = true;
  record: any = {};

  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private location: Location,
    private route: ActivatedRoute,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe(res => {
      this.cGuid = res.cGuid;
      this.getData(res.cGuid);
    });
    // console.log(this.route.params);
    // this.record.MesWo = this.route.params.;
  }

  getData(cGuid: string): void {
    this.loading = true;
    this.http.get(`/mes/mesworkorder/item/${cGuid}?_allow_anonymous=true`).subscribe(res => {
      this.record = res.data;
      this.loading = false;

      this.cdr.detectChanges();
    });
  }

  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  clockon(dataop: NzSafeAny) {
    this.modal.create(MobileClockonComponent, { record: dataop }, { size: 'md' }).subscribe(() => {
      console.log(1);
      this.getData(this.cGuid);
    });
  }

  goback(): void {
    this.location.back();
  }
}
