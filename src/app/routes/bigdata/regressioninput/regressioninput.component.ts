import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-bigdata-regressioninput',
  templateUrl: './regressioninput.component.html'
})
export class BigdataRegressioninputComponent implements OnInit {
  constructor(private msgSrv: NzMessageService, private http: _HttpClient) {}

  ngOnInit(): void {}

  close(): void {}
}
