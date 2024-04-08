import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { RockiihubService } from 'src/app/services/rockiihub.service';

@Component({
  selector: 'app-device-devicelist',
  templateUrl: './devicelist.component.html'
})
export class DeviceDevicelistComponent implements OnInit {
  loading = false;
  data: any[] = [];
  pageIndex = 1;
  ps = 10;

  total = 0;
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
    { title: 'id', index: 'id' },
    { title: 'name', index: 'name' },
    { title: 'type', index: 'type' },
    { title: 'enabled', type: 'yn', index: 'enabled' },
    { title: 'polling', index: 'polling' }
  ];

  pages: STPage = {
    total: '', //分页显示多少条数据，字符串型
    show: true, //显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };
  constructor(private router: Router, private http: _HttpClient, private modal: ModalHelper, private rhubservice: RockiihubService) {}

  ngOnInit(): void {
    this.getData();
  }
  getData(): void {
    this.loading = true;
    this.http.get('https://iad.raopc.com:7081/api/project').subscribe(res => {
      this.data = Object.values(res.devices);
      this.rhubservice.devices = this.data;
      this.total = this.data.length;
      this.loading = false;
    });
  }

  add(): void {
    // this.modal
    //   .createStatic(FormEditComponent, { i: { id: 0 } })
    //   .subscribe(() => this.st.reload());
  }

  naviTags(tags: any): void {
    this.rhubservice.tags = tags;
    this.router.navigate(['/device/tags']);
  }
}
