import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { STChange, STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { format } from 'date-fns';
import { NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { CofcoCofcoprodkpiEditComponent } from './edit/edit.component';
import { CofcoCofcoprodkpiViewComponent } from './view/view.component';

@Component({
  selector: 'app-cofco-cofcoprodkpi',
  templateUrl: './cofcoprodkpi.component.html'
})
export class CofcoCofcoprodkpiComponent implements OnInit {
  loading = false;
  data: any[] = [];
  date: any;
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
    { title: '指标类型', index: 'cKPIType' },
    { title: '项目指标', index: 'cKPIFactor' },
    { title: '指标释义', index: 'cKPIFactorDesc' },
    { title: '单位', index: 'cKPIFactorUnit' },
    { title: '值', index: 'iKPI' },
    { title: '备注', index: 'cMemo' },
    {
      title: '操作',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: CofcoCofcoprodkpiViewComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '更新',
          type: 'modal',
          modal: {
            component: CofcoCofcoprodkpiEditComponent,
            paramsName: 'record'
          },
          click: 'reload'
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

  qpp = {
    page: 1,
    row: 10,
    dDate: ``,
    cOrgGuid: ``
  };

  pages: STPage = {
    total: '', //分页显示多少条数据，字符串型
    show: true, //显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };
  constructor(private http: _HttpClient, private modal: ModalHelper, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.date = new Date();
    this.getData();
    this.getTreeNodes();
  }

  getData(): void {
    this.loading = true;
    this.qpp.dDate = format(new Date(this.date), 'yyyy-MM-dd');
    console.log(this.qpp);
    this.http.get('/cofco/prodkpi/pagination', this.qpp).subscribe(res => {
      this.data = res.data;
      this.total = res.total;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  treeClick(event: any) {
    if (event.keys.length < 1) {
      this.qpp.cOrgGuid = '';
    } else if (event.node.origin.isLeaf) {
      this.qpp.cOrgGuid = event.node.origin.cGuid;
    } else {
      this.qpp.cOrgGuid = '';
    }

    this.getData();
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
      this.qpp.cOrgGuid = ``;
    } else {
      this.qpp.cOrgGuid = ``;
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

  addinit(): void {
    this.loading = true;
    this.qpp.dDate = format(new Date(this.date), 'yyyy-MM-dd');
    this.http.post('/cofco/prodkpi/addwithallfactor', { cOrgGuid: this.qpp.cOrgGuid, dDate: this.qpp.dDate }).subscribe(res => {
      this.getData();
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  add(): void {
    this.modal.createStatic(CofcoCofcoprodkpiEditComponent).subscribe(() => {
      this.st.reload();
      this.getTreeNodes();
    });
  }

  onChange(result: Date): void {
    console.log('onChange: ', result);
  }
}
