import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { CofcoCofcoprodsummaryEditComponent } from './edit/edit.component';
import { CofcoCofcoprodsummaryViewComponent } from './view/view.component';

@Component({
  selector: 'app-cofco-cofcoprodsummary',
  templateUrl: './cofcoprodsummary.component.html'
})
export class CofcoCofcoprodsummaryComponent implements OnInit {
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
    { title: '行号', type: 'no', width: '50px' },
    { title: '日期', index: 'dDate', type: 'date', dateFormat: 'yyyy-MM-dd' },
    { title: '企业编码', index: 'cOrgCode' },
    { title: '企业', index: 'cOrgName' },
    { title: '装置编码', index: 'cAssetCode' },
    { title: '装置', index: 'cAssetName' },
    { title: '产品', index: 'cProduct' },
    { title: '产量', index: 'iProd' },
    { title: '负荷%', index: 'iLoad' },
    { title: '备注', index: 'cMemo' },
    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: CofcoCofcoprodsummaryViewComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '更新',
          type: 'modal',
          modal: {
            component: CofcoCofcoprodsummaryEditComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '删除',
          type: 'del',
          click: item => this.delProdsummary(`${item._id}`)
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
    StrWhere: ``
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
    this.http.get('/cofco/prodsummary/pagination', this.qpp).subscribe(res => {
      this.data = res.data;
      this.total = res.total;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  //get the org for tree nodes
  getTreeNodes(): void {
    this.loading = true;
    this.http.get('/sys/sysorg/getcompanytreenodes').subscribe(data => {
      this.orgnodes = data.treeData;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  conditionChange(e: any) {
    if (e.cOrgCode === '' && e.cOrgName === '') {
      this.qpp.StrWhere = ``;
    } else if (e.cOrgCode === '') {
      this.qpp.StrWhere = e.cOrgName;
    } else {
      this.qpp.StrWhere = e.cOrgCode;
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

  delProdsummary(id: string) {
    this.http.delete(`/cofco/prodsummary/delete/${id}`).subscribe(res => {
      this.st.reload();
    });
  }

  add(): void {
    this.modal.createStatic(CofcoCofcoprodsummaryEditComponent).subscribe(() => {
      this.st.reload();
      this.getTreeNodes();
    });
  }
}
