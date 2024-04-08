import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-bigdata-categorytuning',
  templateUrl: './categorytuning.component.html',
  styleUrls: ['categorytuning.component.less']
})
export class BigdataCategorytuningComponent implements OnInit {
  constructor(private msgSrv: NzMessageService, private http: _HttpClient) {}

  ngOnInit(): void {}
}
