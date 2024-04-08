import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { SysSysorgEditComponent } from './edit/edit.component';
import { SysSysorgViewComponent } from './view/view.component';

@Component({
  selector: 'app-sys-sysorg',
  templateUrl: './sysorg.component.html'
})
export class SysSysorgComponent implements OnInit {
  loading = false;
  data: any[] = [];
  searchSchema: SFSchema = {
    properties: {
      cOrgCode: {
        type: 'string',
        title: '编码'
      },
      cOrgName: {
        type: 'string',
        title: '名称'
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
    { title: '编码', index: 'cOrgCode' },
    { title: '名称', index: 'cOrgName' },
    { title: '类型', index: 'cOrgType' },
    { title: '父项', index: 'cParentOrgName' },
    { title: '负责人', index: 'cHead' },
    {
      title: '状态',
      index: 'status',
      render: 'status',
      filter: {
        menus: this.status,
        fn: (filter, record) => record.status === filter['index']
      }
    },
    {
      title: '操作',
      width: 150,
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: SysSysorgViewComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '更新',
          type: 'modal',
          modal: {
            component: SysSysorgEditComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '删除',
          type: 'del',
          click: item => this.del(item.cGuid)
        }
      ]
    }
  ];

  @ViewChild('nzTreeComponent', { static: false })
  nzTreeComponent!: NzTreeComponent;
  orgnodes: NzTreeNodeOptions[] = [];

  pageIndex = 1;
  ps = 10;

  total = 0;

  private qpp = {
    page: 1,
    row: 10,
    StrWhere: ``,
    cOrgCode: ``,
    cOrgName: ``
  };

  pages: STPage = {
    total: '', //分页显示多少条数据，字符串型
    show: true, //显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };
  constructor(private http: _HttpClient, private modal: ModalHelper, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.getData();
    this.getTreeNodes();
  }

  getData(): void {
    this.loading = true;
    this.http.get('/sys/sysorg/pagination', this.qpp).subscribe(res => {
      this.data = res.data;
      this.total = res.total;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  //get the org for tree nodes
  getTreeNodes(): void {
    this.loading = true;
    this.http.get('/sys/sysorg/gettreenodes').subscribe(data => {
      this.orgnodes = data.treeData;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  conditionChange(e: any) {
    if (e.cOrgCode == undefined) e.cOrgCode = '';
    if (e.cOrgName == undefined) e.cOrgName = '';
    this.qpp.cOrgCode = '';
    this.qpp.cOrgName = '';
    if (e.cOrgCode !== '' && e.cOrgName !== '') {
      this.qpp.cOrgCode = e.cOrgCode;
      this.qpp.cOrgName = e.cOrgName;
    } else if (e.cOrgCode !== '') {
      this.qpp.cOrgCode = e.cOrgCode;
    } else if (e.cOrgName !== '') {
      this.qpp.cOrgName = e.cOrgName;
    } else {
      this.qpp.cOrgCode = '';
      this.qpp.cOrgName = '';
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

  add(): void {
    this.modal.createStatic(SysSysorgEditComponent).subscribe(() => {
      this.st.reload();
      this.getTreeNodes();
    });
  }

  del(cGuid: String): void {
    this.http.delete(`sys/sysorg/item/${cGuid}`).subscribe(res => {
      this.getData();
      this.getTreeNodes();
    });
  }
}
