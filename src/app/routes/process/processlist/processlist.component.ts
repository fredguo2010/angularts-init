import { Component, OnInit, ViewChild } from '@angular/core';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';

@Component({
  selector: 'app-process-processlist',
  templateUrl: './processlist.component.html',
  styleUrls: ['./processlist.component.less']
})
export class ProcessProcesslistComponent implements OnInit {
  processNumber: number = 5;
  listOfData: any[] = [
    [
      {
        key: '1',
        processnumber: '127768',
        processtype: '已创建',
        processname: '点巡检计划',
        processowner: 'Will',
        processimg: 'pp1.png'
      }
    ],
    [
      {
        key: '2',
        processnumber: '127768',
        processtype: '已创建',
        processname: '点巡检计划',
        processowner: 'Will',
        processimg: 'pp.png'
      }
    ]
  ];

  constructor(private http: _HttpClient, private modal: ModalHelper) {}

  ngOnInit(): void {
    console.log('1');
  }

  change(): void {
    this.listOfData = [];
    for (var i = 0; i < this.processNumber; i++) {
      console.log(i);
      if (i == this.processNumber - 1) {
        this.listOfData.push([
          {
            key: i + 1,
            processnumber: `${(i + 1).toString()}.1`,
            processtype: '已创建',
            processname: '点巡检计划',
            processowner: 'Will',
            processimg: `pp.png`
          }
        ]);
      } else if (i === 3) {
        this.listOfData.push([
          {
            key: i + 1,
            processnumber: `${(i + 1).toString()}.1`,
            processtype: '已创建',
            processname: '点巡检计划',
            processowner: 'Will',
            processimg: `pp${(i + 1).toString()}.png`
          },
          {
            key: i + 1,
            processnumber: `${(i + 1).toString()}.2`,
            processtype: '已创建',
            processname: '点巡检计划',
            processowner: 'Will',
            processimg: `pp${(i + 1).toString()}.png`
          }
        ]);
      } else {
        this.listOfData.push([
          {
            key: i + 1,
            processnumber: `${(i + 1).toString()}.1`,
            processtype: '已创建',
            processname: '点巡检计划',
            processowner: 'Will',
            processimg: `pp${(i + 1).toString()}.png`
          }
        ]);
      }
    }
  }
}
