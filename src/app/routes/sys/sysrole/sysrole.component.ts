import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroupDirective } from '@angular/forms';
import { STChange, STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzFormatEmitEvent, NzTreeComponent, NzTreeNodeOptions } from 'ng-zorro-antd/tree';

import { SysSysroleEditComponent } from '../sysrole/edit/edit.component';
import { SysSysroleViewComponent } from '../sysrole/view/view.component';

@Component({
  selector: 'app-sys-sysrole',
  templateUrl: './sysrole.component.html'
})
export class SysSysroleComponent implements OnInit {
  selectRoleGuid: string = '';
  radioRoleValue: string = 'admin';
  roledata: Array<{
    cGuid: string;
    cRoleCode: string;
    cRoleName: string;
    cDescription: string;
    dAddTime: Date;
  }> = [];
  @ViewChild('nzTreeComponent', { static: false }) nzRoleTreeComponent!: NzTreeComponent;

  menunodes: NzTreeNodeOptions[] = [];

  loading = false;

  searchSchema: SFSchema = {
    properties: {
      no: {
        type: 'string',
        title: '编号'
      }
    }
  };
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '编号', index: 'no' },
    { title: '调用次数', type: 'number', index: 'callNo' },
    { title: '头像', type: 'img', width: '50px', index: 'avatar' },
    { title: '时间', type: 'date', index: 'updatedAt' },
    {
      title: '',
      buttons: [
        { text: '查看', type: 'static', component: SysSysroleViewComponent, click: 'reload' },
        { text: '编辑', type: 'static', component: SysSysroleEditComponent, click: 'reload' }
      ]
    }
  ];

  rolecolumns: STColumn[] = [
    // { title: 'ID', index: 'userid' },
    { title: '', index: 'key', type: 'radio', width: 40 },
    { title: '代码', index: 'cRoleCode' },
    { title: '角色', index: 'cRoleName' },
    {
      title: '',
      buttons: [
        {
          text: '查看',
          type: 'modal',
          modal: {
            component: SysSysroleViewComponent,
            paramsName: 'record'
          },
          click: 'reload'
        },
        {
          text: '更新',
          type: 'modal',
          modal: {
            component: SysSysroleEditComponent,
            paramsName: 'record'
          },
          click: 'reload'
        }
      ]
    }
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper, private cdr: ChangeDetectorRef, private msgSrv: NzMessageService) {}

  ngOnInit(): void {
    this.getRoleData();
  }

  getRoleData(): void {
    this.loading = true;
    this.http.get('/sys/sysrole/getall').subscribe(data => {
      this.roledata = data;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  //get the menu for tree nodes
  getMenuTreeNodes(croleGuid: string): void {
    this.loading = true;
    this.http.get('/sys/sysrolemenu/gettreenodesbyrole', { cRoleGuid: croleGuid }).subscribe(data => {
      console.log(data.treeData);
      this.menunodes = data.treeData;
      this.loading = false;
      this.cdr.detectChanges();
    });
  }

  rstChange(e: STChange): void {
    switch (e.type) {
      case 'radio':
        console.log(JSON.stringify(e.radio!));
        this.selectRoleGuid = e.radio.cGuid;
        this.getMenuTreeNodes(e.radio.cGuid);
        break;
      case 'pi':
        this.getRoleData();
        break;
    }
  }

  syncRoleMenu(): void {
    if (this.selectRoleGuid == '') {
      this.msgSrv.warning('请先选择角色');
    } else {
      this.loading = true;
      this.http.get('/sys/sysrolemenu/syncsysmenubyrole', { cRoleGuid: this.selectRoleGuid }).subscribe(data => {
        this.getMenuTreeNodes(this.selectRoleGuid);

        this.loading = false;
        this.cdr.detectChanges();
      });
    }
  }

  nzMenuCheck(event: NzFormatEmitEvent): void {
    this.loading = true;
    this.http
      .put(`/sys/sysrolemenu/item/${event.node?.key}`, { cGuid: event.node?.key, bSelect: event.node?.isChecked })
      .subscribe(data => {
        this.getMenuTreeNodes(this.selectRoleGuid);
        this.loading = false;
        this.cdr.detectChanges();
      });
    // console.log(event.node);
  }

  add(): void {
    this.modal.createStatic(SysSysroleEditComponent).subscribe(() => this.st.reload());
  }
}
