import { ChangeDetectorRef, Component, inject, OnInit, ViewChild } from '@angular/core';
import { LoadingService } from '@delon/abc/loading';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient, SettingsService } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzUploadChangeParam } from 'ng-zorro-antd/upload';

import { SysSysdictEditComponent } from './edit/edit.component';
import { SysSysdictViewComponent } from './view/view.component';
@Component({
  selector: 'app-sys-sysdict',
  templateUrl: './sysdict.component.html'
})
export class SysSysdictComponent implements OnInit {
  private readonly loadingSrv = inject(LoadingService);
  loading = true;
  accept: string = '.csv';
  data: any[] = [];
  searchSchema: SFSchema = {
    properties: {
      cName: {
        type: 'string',
        title: '项目名称 / 项目值 / 分类'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '行号', type: 'no', width: 70 },
    { title: '项目名称', index: 'cName' },
    { title: '项目值', index: 'cValue' },
    { title: '分类', index: 'cCategory' },
    { title: '有效', index: 'iStatus', width: 80, render: 'status' },
    { title: '描述', index: 'cMemo', className: 'text-center' },
    {
      title: '操作',
      className: 'text-center',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: SysSysdictViewComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '更新',
          type: 'modal',
          modal: {
            component: SysSysdictEditComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '删除',
          pop: {
            title: '确认删除?',
            cancelText: '取消',
            okText: '确认'
          },
          type: 'del',
          click: (item: any) => this.deleteByGuid(item.cGuid)
        }
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
  constructor(
    private http: _HttpClient,
    private modal: ModalHelper,
    private cdr: ChangeDetectorRef,
    private message: NzMessageService,
    private settingsService: SettingsService
  ) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.loadingSrv.open({ type: 'spin' });
    this.http.get('/sys/sysdictionary/pagination', this.qpp).subscribe(res => {
      this.data = res.data;
      this.total = res.total;
      this.loading = false;
      this.cdr.detectChanges();
      this.loadingSrv.close();
    });
  }

  deleteByGuid(cGuid: string): void {
    this.loading = true;
    this.http.delete(`/sys/sysdictionary/item/${cGuid}`).subscribe(res => {
      if (res.isok) {
        this.message.success(res.message);
        this.getData();
      } else {
        this.message.error(res.message);
      }
    });
  }

  conditionChange(e: any) {
    console.log(e);
    if (e.cName == undefined || e.cName === '') {
      this.qpp.StrWhere = ``;
    } else {
      this.qpp.StrWhere = e.cName;
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
      case 'resize':
        //console.log(e.resize?.width);
        break;
      case 'dblClick':
        this.modal.create(SysSysdictViewComponent, { record: e.dblClick?.item }).subscribe(() => this.st.reload());
        break;
    }
  }

  add(): void {
    this.modal.createStatic(SysSysdictEditComponent, { record: { userid: '' } }).subscribe(() => this.st.reload());
  }

  exportCsv() {
    const filename = 'Sys_Dic_Template';
    // 替换为你的后端服务器端点
    const serverEndpoint = `/api/sys/sysdictionary/downloadCsvFile/${filename}`;

    fetch(serverEndpoint)
      .then(response => response.blob())
      .then(blob => {
        const link = document.createElement('a');
        link.href = window.URL.createObjectURL(blob);
        link.download = `${filename}.csv`; // 替换为你想要的文件名
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch(error => {
        console.error('Error downloading CSV file:', error);
      });
  }
  handleChange(info: NzUploadChangeParam): void {
    // console.log(`file info status: ${info.file.status}`);
    // this.msg.success(`file info status: ${info.file.status}`);
    if (info.file.status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (info.file.status === 'done') {
      this.message.success(`${info.file.name} file uploaded successfully`);
      this.getData();
    } else if (info.file.status === 'error') {
      this.message.error(`${info.file.name} file upload failed.`);
    }
  }
  onChange(event: Date, index: number): void {
    this.st.setRow(index, { dTimestamp: event });
  }
  uploadAction() {
    return `/sys/sysdictionary/uploadcsv?cCreateUserName=${this.settingsService.user.username}&cCreateUserId=${this.settingsService.user.userid}`;
  }

  show(): void {
    this.loadingSrv.open({ type: 'spin' });

    setTimeout(() => this.loadingSrv.close(), 1000 * 3);
  }
}
