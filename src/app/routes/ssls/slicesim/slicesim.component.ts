import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { Subscription } from 'rxjs';

import { resolve } from 'dns';

@Component({
  selector: 'app-ssls-slicesim',
  templateUrl: './slicesim.component.html',
  styleUrls: ['slicesim.component.less']
})
export class SslsSlicesimComponent implements OnInit {
  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '行号', type: 'no', width: 45 },
    { title: '框号', width: '45', index: 'cFrameCode' },
    { title: '槽号', width: '45', index: 'cSlotCode' },
    { title: '槽', index: 'cSlotName' },
    { title: '栏', width: '45', index: 'iColumn' },
    { title: '块', width: '45', index: 'iBlock' }
  ];

  columnsLevel: STColumn[] = [
    { title: '行号', type: 'no', width: 45 },
    { title: '槽', index: 'cSlotName' },
    { title: '栏', width: '45', index: 'iColumn' },
    { title: '块', width: '45', index: 'iBlock' },
    { title: '层', width: '45', index: 'iLevel' },
    { title: '长(mm)', width: '45', index: 'iLength' },
    { title: '宽(mm)', width: '45', index: 'iWidth' },
    { title: '高(mm)', width: '45', index: 'iHeight' }
  ];

  testdatacolumns: STColumn[] = [
    { title: '行号', type: 'no', width: 45 },
    { title: '顺序', width: '45', index: 'iOrder' },
    { title: 'Bar', width: '45', index: 'cBar' },
    { title: 'PO', index: 'cPO' },
    { title: '宽', width: '45', index: 'iWidth' },
    { title: '长', width: '45', index: 'iLength' },
    { title: '厚', width: '45', index: 'iThickness' },
    { title: '测试', width: '45', index: 'bSim' }
  ];

  loading = true;
  simloading = false;
  data: any;
  simulatordata: any;
  level1data: any;
  levelsdata: any;
  blocklevelsdata: any;
  testdata: any;

  cBatchNo: string = '20221202';
  cPoNumber: string = 'PO001';

  page: STPage = {
    total: '', //分页显示多少条数据，字符串型
    show: false, //显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };
  @ViewChild('svglevel1')
  svglevel1Container!: ElementRef;
  level1Svgs: SafeHtml[] = [];
  levelsSvg: string = ``;

  constructor(private http: _HttpClient, private modal: ModalHelper, private cdr: ChangeDetectorRef, private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    this.getData();
  }

  getData(): void {
    this.loading = true;
    this.http
      .get('/ssls/sliceslot/getall', {
        cBatchNo: this.cBatchNo
      })
      .subscribe(res => {
        this.data = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      });
    this.http
      .get('/ssls/getsimulatortestdata', {
        cBatchNo: this.cBatchNo
      })
      .subscribe(res => {
        this.testdata = res.data;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  // 模拟铜牌下线
  simOffline(): void {
    this.loading = true;
    this.simloading = true;
    this.http
      .get('/ssls/simulator', {
        cBatchNo: this.cBatchNo,
        cPoNumber: this.cBatchNo
      })
      .subscribe(res => {
        this.simulatordata = res.data;
        if (res.isok) {
          this.getData();
          this.getslotlevel1(this.simulatordata.cSlotGuid);
          this.updateFrameSlotsLevel1(this.simulatordata.cFrameGuid);

          this.getslotlevels(this.simulatordata.cSlotGuid);
          this.getslotblocklevels(this.simulatordata.cSlotGuid, this.simulatordata.iColumn, this.simulatordata.iBlock);
        }

        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  updateFrameSlotsLevel1(cFrameGuid: string) {
    this.loading = true;
    this.http
      .get('/ssls/frameslot/getall', {
        cFrameGuid: cFrameGuid
      })
      .subscribe(async res => {
        this.level1Svgs = [];
        for (let index = 0; index < res.data.length; index++) {
          await this.getslotlevel1lengthwidth(res.data[index].cGuid);
        }
        this.simloading = false;
      });
  }

  getslotlevel1(cSlotGuid: string): void {
    this.loading = true;
    this.http
      .get('/ssls/getslotlevel1lengthwidth', {
        cSlotGuid: cSlotGuid
      })
      .subscribe(res => {
        this.level1data = res.data;
      });
  }

  async getslotlevel1lengthwidth(cSlotGuid: string): Promise<void> {
    return new Promise(resolve => {
      this.http
        .get('/ssls/getslotlevel1lengthwidth', {
          cSlotGuid: cSlotGuid
        })
        .subscribe(async res => {
          this.loading = false;
          let lel1Svg = `<div><svg width="160" height="1500"> `;
          let tmpx = 0;
          let tmpy = 0;
          let block1width = 0;
          let tempColumn = 1;
          for (let index = 0; index < res.data.length; index++) {
            if (res.data[index].iBlock == 1) {
              tmpy = 0;
              block1width = Number(res.data[index].iWidth);
            }

            if (tempColumn == res.data[index].iColumn) {
              if (
                this.simulatordata.cSlotGuid == cSlotGuid &&
                this.simulatordata.iColumn == res.data[index].iColumn &&
                this.simulatordata.iBlock == res.data[index].iBlock
              ) {
                lel1Svg += `<g>
          <rect fill="green" stroke="blue" x="${tmpx}" y="${tmpy}" width="${res.data[index].iWidth}" height="${res.data[index].iLength}">
          <animate attributeName="opacity" values="1;.1;1" dur="2s" repeatCount="indefinite"></animate>
          </rect>
          <text x="${tmpx}" y="${tmpy + 10}" font-family="sans-serif" font-size="12px" fill="white">${res.data[index].iLength}</text>
        </g>`;
              } else {
                lel1Svg += `<g>
                <rect fill="green" stroke="blue" x="${tmpx}" y="${tmpy}" width="${res.data[index].iWidth}" height="${
                  res.data[index].iLength
                }">
                </rect>
                <text x="${tmpx}" y="${tmpy + 10}" font-family="sans-serif" font-size="12px" fill="white">${res.data[index].iLength}</text>
              </g>`;
              }

              tmpy += Number(res.data[index].iLength);
            } else {
              tempColumn = res.data[index].iColumn;
              tmpx += block1width;

              if (
                this.simulatordata.cSlotGuid == cSlotGuid &&
                this.simulatordata.iColumn == res.data[index].iColumn &&
                this.simulatordata.iBlock == res.data[index].iBlock
              ) {
                lel1Svg += `<g>
                          <rect fill="green" stroke="blue" x="${tmpx}" y="${tmpy}" width="${res.data[index].iWidth}" height="${
                  res.data[index].iLength
                }">
                          <animate attributeName="opacity" values="1;.1;1" dur="2s" repeatCount="indefinite"></animate>
                          </rect>
                          <text x="${tmpx}" y="${tmpy + 10}" font-family="sans-serif" font-size="12px" fill="white">${
                  res.data[index].iLength
                }</text>
                        </g>`;
              } else {
                lel1Svg += `<g>
                          <rect fill="green" stroke="blue" x="${tmpx}" y="${tmpy}" width="${res.data[index].iWidth}" height="${+res.data[
                  index
                ].iLength}"> 
                            </rect>
                            <text x="${tmpx}" y="${tmpy + 10}" font-family="sans-serif" font-size="12px" fill="white">${
                  res.data[index].iLength
                }</text>
                        </g>`;
              }
              tmpy += Number(res.data[index].iLength);
            }
          }

          lel1Svg += '</svg>';
          this.level1Svgs.push(this.sanitizer.bypassSecurityTrustHtml(lel1Svg));
          console.log(cSlotGuid);
          resolve();
          this.cdr.detectChanges();
        });
    });
  }

  getslotlevels(cSlotGuid: string): void {
    this.loading = true;
    this.http
      .get('/ssls/getslotlevels', {
        cSlotGuid: cSlotGuid
      })
      .subscribe(res => {
        this.levelsdata = res.data;

        this.loading = false;
        // this.levelsSvg = `<svg width="80" height="1800"> `;
        // let tmpx = 0;
        // let tmpy = 0;
        // let block1width = 0;
        // let tempColumn = 1;
        // let tempBlock = 1;
        // for (let index = 0; index < this.levelsdata.length; index++) {
        //   if (this.levelsdata[index].iBlock == 1 && this.levelsdata[index].iLevel == 1) {
        //     tmpx = 0;
        //     block1width = Number(this.levelsdata[index].iLength);
        //   }

        //   if (tempColumn == this.levelsdata[index].iColumn && tempBlock == this.levelsdata[index].iBlock) {
        //     this.levelsSvg += `<g>
        //   <rect fill="green" stroke="blue" x="${tmpx}" y="${tmpy}" width="${this.levelsdata[index].iHeight}" height="${this.levelsdata[index].iLength}"></rect>
        // </g>`;
        //     tmpx += Number(this.levelsdata[index].iColumn) * 3;
        //   } else {
        //     tempColumn = this.levelsdata[index].iColumn;
        //     tempBlock = this.levelsdata[index].iBlock;
        //     tmpy += 0;
        //     tmpx = Number(this.levelsdata[index].iColumn) * 3 - 3;
        //     this.levelsSvg += `<g>
        //   <rect fill="green" stroke="blue" x="${tmpx}" y="${tmpy}" width="${this.levelsdata[index].iHeight}" height="${+this.levelsdata[
        //       index
        //     ].iLength}"></rect>
        // </g>`;
        //     tmpx += Number(this.levelsdata[index].iHeight);
        //   }
        // }

        // this.levelsSvg += '</svg>';

        // this.svglevelsContainer.nativeElement.innerHTML = this.levelsSvg;
        this.cdr.detectChanges();
      });
  }

  getslotblocklevels(cSlotGuid: string, iColumn: number, iBlock: number): void {
    this.loading = true;
    this.http
      .get('/ssls/getslotblocklevels', {
        cSlotGuid: cSlotGuid,
        iColumn: iColumn,
        iBlock: iBlock
      })
      .subscribe(res => {
        this.blocklevelsdata = res.data;

        this.loading = false;
        this.cdr.detectChanges();
      });
  }
  parseStyle(p1: any): Object {
    console.log(p1);
    return JSON.parse(JSON.stringify(p1));
  }
}
