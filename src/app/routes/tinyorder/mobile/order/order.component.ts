import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-mobile-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.less'],
  host: {
    '[class.alain-ms__console-full]': 'true'
  }
})
export class MobileOrderComponent implements OnInit {
  status = '1'; //0 未开始 ，1 执行中，2，已结束，3，已取消
  loading = true;
  iPercent!: number;
  gridStyle = {
    width: '100%',
    textAlign: 'center'
  };
  gridStyle33 = {
    width: '33.3%',
    textAlign: 'center',
    padding: '10px',
    border: 'none'
  };

  data: Array<{
    cGuid: string;
    cWorkOrder: string;
    cCustomerCode: string;
    cCustomerName: string;
    cRouteGuid: string;
    cPartNumber: string;
    cProductName: string;
    cRouteCode: string;
    cRouteName: string;
    cRouteVersion: string;
    iPriority: number;
    iStatus: number;
    iPlanQty: number;
    iQtyGood: number;
    iQtyBad: number;
    iQty: number;
    dPlanStart: Date;
    dPlanEnd: Date;
    dActualStart: Date;
    dActualEnd: Date;
    Mes_WorkOrderDetail: Array<{
      cGuid: string;
      cWorkOrderGuid: string;
      cWorkOrder: string;
      iOrder: number;

      cOpNumber: string;
      cOpName: string;
      cOpDescription: string;
      iStatus: number;
      iPlanQty: number;
      iQtyGood: number;
      iQtyBad: number;
      iQty: number;
      dPlanStart: Date;
      dPlanEnd: Date;
      dActualStart: Date;
      dActualEnd: Date;
    }>;
  }> = [];

  constructor(private http: _HttpClient, private modal: ModalHelper, private cdr: ChangeDetectorRef, private router: Router) {}

  ngOnInit(): void {
    this.iPercent = 90;
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.http
      .get('/mes/mesworkorder/getall?_allow_anonymous=true', {
        iStatus: this.status
      })
      .subscribe(res => {
        this.data = res.data;
        console.log(this.data);
        this.loading = false;
        this.cdr.detectChanges();
      });
  }
  switchstatus(evetn: any) {
    this.getData();
  }

  goDetail(woid: any): void {
    this.router.navigate(['/tinyorder/mobile/orderdetail', { cGuid: woid }]);
  }
}
