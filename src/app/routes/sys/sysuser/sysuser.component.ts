import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import * as printJS from 'print-js';

import { SysSysuserEditComponent } from './edit/edit.component';
import { SysSysuserViewComponent } from './view/view.component';

@Component({
  selector: 'app-sys-sysuser',
  templateUrl: './sysuser.component.html'
})
export class SysSysuserComponent implements OnInit {
  loading = false;
  data: any[] = [];
  searchSchema: SFSchema = {
    properties: {
      userid: {
        type: 'string',
        title: '用户名/姓/名'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '行号', type: 'no' },
    // { title: '用户id', index: 'userid' },
    { title: '用户名', index: 'username' },
    { title: '姓', index: 'lastname', width: 70 },
    { title: '名', index: 'firstname', width: 70 },
    { title: '邮箱', index: 'email', width: 180 },
    { title: '职务', index: 'title' },
    { title: '地址', index: 'address', width: 180 },
    { title: '电话', index: 'phone' },
    // { title: '新建时间', type: 'date', index: 'dAddTime' },

    { title: '角色', index: 'role', width: 100 },

    {
      title: '',
      width: 170,
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: SysSysuserViewComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '删除',
          i18n: 'sf.delete',
          type: 'del',
          click: item => this.del(item.cGuid)
        },
        {
          text: '更新',
          type: 'modal',
          modal: {
            component: SysSysuserEditComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        { text: '重置密码', pop: '确认吗？', click: item => this.resetpwd(item) }
      ]
    }
  ];

  pageIndex = 1;
  ps = 10;

  total = 0;

  private qpp = {
    page: 1,
    row: 10,
    StrWhere: ``,
    userid: ''
  };

  pages: STPage = {
    total: '', //分页显示多少条数据，字符串型
    show: true, //显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };
  constructor(private http: _HttpClient, private modal: ModalHelper, private cdr: ChangeDetectorRef, private message: NzMessageService) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.http.get('/sys/user/pagination', this.qpp).subscribe(res => {
      this.data = res.data;
      this.total = res.total;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  resetpwd(item: any): any {
    this.loading = true;
    this.http.post('/Users/SysUserResetPassword', { cGuid: item.cGuid, userid: item.userid }).subscribe(res => {
      if (res.isok) {
        this.message.info(`重置成功${res.message}`);
      } else {
        this.message.warning(res.message);
      }
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  conditionChange(e: any) {
    console.log(e);
    if (e.userid == undefined || e.userid === '') {
      this.qpp.StrWhere = ``;
      this.qpp.userid = '';
    } else {
      this.qpp.StrWhere = e.userid;
      this.qpp.userid = e.userid;
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

  printSection(id: any) {
    printJS({ printable: this.data, type: 'json', properties: ['username', 'firstname', 'lastname'] });
  }

  add(): void {
    this.modal.createStatic(SysSysuserEditComponent, { record: { userid: '' } }).subscribe(() => this.st.reload());
  }

  del(cGuid: String): void {
    this.http.delete(`sys/user/item/${cGuid}`).subscribe(res => {
      this.getData();
    });
  }
}
