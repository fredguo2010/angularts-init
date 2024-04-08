import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc/st';
import { XlsxService } from '@delon/abc/xlsx';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-sys-sysloginlog',
  templateUrl: './sysloginlog.component.html'
})
export class SysSysloginlogComponent implements OnInit {
  loading = false;
  data: any[] = [];
  searchSchema: SFSchema = {
    properties: {
      userid: {
        type: 'string',
        title: '用户id'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '行号', type: 'no' },
    { title: '浏览器', index: 'browser' },
    { title: '设备类型', index: 'device_type' },
    { title: 'ip', index: 'ip', width: 150 },
    { title: '登录时间', type: 'date', index: 'login_time' },

    { title: '操作系统', index: 'system_name', width: 100 },
    { title: '用户id', index: 'userid' },

    {
      title: '',
      buttons: [
        // { text: '查看', click: (item: any) => `/form/${item.id}` },
        // { text: '编辑', type: 'static', component: FormEditComponent, click: 'reload' },
      ]
    }
  ];

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
    this.http.get('/sys/sysloginlog/pagination', this.qpp).subscribe(res => {
      this.data = res.data;
      this.total = res.total;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  conditionChange(e: any) {
    if (e.userid == undefined || e.userid === '') {
      this.qpp.StrWhere = ``;
    } else {
      this.qpp.StrWhere = `${e.userid}`;
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
          name: 'LoginLog'
        }
      ],
      filename: 'LoginLog export.xlsx'
    });
  }
}
