import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { SysSysmenuEditComponent } from './edit/edit.component';
import { SysSysmenuViewComponent } from './view/view.component';

@Component({
  selector: 'app-sys-sysmenu',
  templateUrl: './sysmenu.component.html'
})
export class SysSysmenuComponent implements OnInit {
  loading = false;
  data: any[] = [];
  searchSchema: SFSchema = {
    properties: {
      text: {
        type: 'string',
        title: '菜单',
        ui: {
          i18n: 'name'
        }
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
    { title: '菜单', index: 'text' },
    { title: '路由', index: 'link' },
    { title: 'i18n', index: 'i18n' },
    { title: 'icon', index: 'icon' },
    { title: '备注', index: 'memo' },
    {
      title: '状态',
      index: 'status',
      render: 'status',
      filter: {
        menus: this.status,
        fn: (filter, record) => record.status === filter['index']
      }
    },
    { title: '排序', index: 'sort' },
    { title: '新建时间', index: 'dAddTime', type: 'date' },
    {
      title: { i18n: 'sf.action' },
      width: 150,
      buttons: [
        {
          text: '查看',
          i18n: 'sf.view',
          type: 'modal',
          modal: {
            component: SysSysmenuViewComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '更新',
          i18n: 'sf.edit',
          type: 'modal',
          modal: {
            component: SysSysmenuEditComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '删除',
          i18n: 'sf.delete',
          type: 'del',
          click: item => this.del(item.cGuid)
        }
      ]
    }
  ];

  @ViewChild('nzTreeComponent', { static: false })
  nzTreeComponent!: NzTreeComponent;
  menunodes: NzTreeNodeOptions[] = [];

  pageIndex = 1;
  ps = 10;

  total = 0;

  treeClick(event: any) {
    if (event.keys.length < 1) {
      this.qpp.cParentGuid = '';
    } else if (event.node.origin.isLeaf) {
      this.qpp.cParentGuid = event.node.origin.cParentGuid ?? event.node.origin.cGuid;
    } else {
      this.qpp.cParentGuid = event.node.origin.cGuid;
    }

    this.getData();
  }

  private qpp = {
    page: 1,
    row: 10,
    text: ``,
    cParentGuid: ``
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
    this.http.get('/sys/sysmenu/pagination', this.qpp).subscribe(res => {
      this.data = res.data;
      this.total = res.total;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  //get the menu for tree nodes
  getTreeNodes(): void {
    this.loading = true;
    this.http.get('/sys/sysmenu/gettreenodes').subscribe(data => {
      this.menunodes = data.treeData;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  conditionChange(e: any) {
    if (e.text == undefined || e.text === '') {
      this.qpp.text = ``;
    } else {
      this.qpp.text = `${e.text}`;
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
    this.modal.createStatic(SysSysmenuEditComponent).subscribe(() => {
      this.st.reload();
      this.getTreeNodes();
    });
  }

  del(cGuid: String): void {
    this.http.delete(`sys/sysmenu/item/${cGuid}`).subscribe(res => {
      this.getData();
      this.getTreeNodes();
    });
  }
}
