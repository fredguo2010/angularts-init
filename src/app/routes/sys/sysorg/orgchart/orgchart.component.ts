import { AfterViewInit, Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

declare var $: any;
@Component({
  selector: 'app-sys-orgchart',
  templateUrl: './orgchart.component.html',
  styleUrls: ['./orgchart.component.scss']
})
export class SysOrgchartComponent implements AfterViewInit {
  constructor(private msgSrv: NzMessageService, private http: _HttpClient) {}
  loading = false;
  ngAfterViewInit(): void {
    this.loading = true;
    this.http.get('/sys/sysorg/gettreenodes').subscribe(data => {
      this.loading = false;
      let ds = data.treeData[0];
      this.initOrgChart(ds);
    });
  }

  initOrgChart(ds: any): void {
    $(function () {
      var nodeTemplate = function (data: any) {
        return `
          <span class="office">${data.cOrgType}</span>
          <div class="title">${data.cOrgCode}</div>
          <div class="content">${data.title}</div>
        `;
      };

      var oc = $('#chart-container').orgchart({
        chartClass: 'myChart',
        data: ds,
        pan: true,
        nodeTemplate: nodeTemplate
      });
    });
  }
}
