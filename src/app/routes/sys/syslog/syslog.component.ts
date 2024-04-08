import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc/st';
import { XlsxService } from '@delon/abc/xlsx';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';

import { SysSyslogViewComponent } from './view/view.component';

@Component({
  selector: 'app-sys-syslog',
  templateUrl: './syslog.component.html'
})
export class SysSyslogComponent implements OnInit {
  loading = false;
  data: any[] = [];
  searchSchema: SFSchema = {
    properties: {
      cModule: {
        type: 'string',
        title: '模块'
      }
    }
  };

  status = [
    { index: 0, text: '停用', value: false, type: 'default', checked: false },
    {
      index: 1,
      text: '启用',
      value: false,
      type: 'processing',
      checked: false
    }
  ];

  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '行号', type: 'no' },
    { title: '操作时间', index: 'dTimeStamp' },
    { title: '操作模块', index: 'cModule' },
    { title: '操作类型', index: 'cActionType' },
    { title: '操作用户', index: 'cUserName' },
    { title: '对象值', index: 'cObjectValue' },
    { title: '操作描述', index: 'cDescription' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: SysSyslogViewComponent,
            paramsName: 'record'
          },
          click: 'reload'
        }
      ]
    }
  ];

  @ViewChild('nzTreeComponent', { static: false })
  pageIndex = 1;
  ps = 10;

  total = 0;

  private qpp = {
    page: 1,
    row: 10,
    StrWhere: ``
  };

  pages: STPage = {
    total: '', //分页显示多少条数据，字符串型
    show: true, //显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };
  constructor(private http: _HttpClient, private modal: ModalHelper, private cdr: ChangeDetectorRef, private xlsx: XlsxService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.http.get('/sys/syslog/pagination', this.qpp).subscribe(res => {
      this.data = res.data;
      this.total = res.total;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  conditionChange(e: any) {
    if (e.cModule == undefined || e.cModule === '') {
      this.qpp.StrWhere = ``;
    } else {
      this.qpp.StrWhere = `${e.cModule}`;
    }

    this.qpp.page = 1;
    this.getData();
  }

  stChange(e: STChange): void {
    switch (e.type) {
      case 'pi':
        this.qpp.page = e.pi;
        this.getData();
        break;
      case 'filter':
        this.getData();
        break;
    }
  }

  download(): void {
    const data = [this.columns.map(i => i.title)];
    //const data = this.twData;
    this.data.forEach(i => data.push(this.columns.map(c => i[c.index as string])));
    this.xlsx.export({
      sheets: [
        {
          data,
          name: 'SysLog'
        }
      ],
      filename: 'SysLog export.xlsx'
    });
  }
}
