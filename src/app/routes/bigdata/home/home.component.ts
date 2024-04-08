import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-bigdata-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class BigdataHomeComponent implements OnInit {
  record: any = {};
  i: any;

  constructor(private msgSrv: NzMessageService, private http: _HttpClient) {}

  ngOnInit(): void {}
}
