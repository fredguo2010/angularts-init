import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Chart } from '@antv/g2';
import { STColumn, STComponent, STPage } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { format } from 'date-fns';
import * as echarts from 'echarts';
import { Random } from 'mockjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-cofco-cofcosite',
  templateUrl: './cofcosite.component.html',
  styleUrls: ['./cofcosite.component.less']
})
export class CofcoCofcositeComponent implements OnInit {
  loading = false;
  dataEnergy: any[] = [];
  date: any;

  webSite: any[] = [32212];
  cname: string = '';
  chart!: Chart;
  year = new Date().getFullYear();
  status = {
    i1: false,
    i2: false,
    i3: true
  };
  stat = {
    item1: 0,
    item2: 0,
    item3: 0
  };
  eoptionAssetRuntime: any = {};
  eoptionProdProcess: any = {};
  pageIndex = 1;
  ps = 5;

  total = 0;

  qpp = {
    page: 1,
    row: 10,
    dDate: ``,
    cOrgGuid: ``
  };

  @ViewChild('st') private readonly st!: STComponent;
  columns: STColumn[] = [
    { title: '行号', type: 'no', width: '50px' },
    { title: '项目指标', index: 'cKPIFactor' },
    { title: '指标释义', index: 'cKPIFactorDesc' },
    { title: '单位', index: 'cKPIFactorUnit' },
    { title: '值', index: 'iKPI' }
  ];

  pages: STPage = {
    total: '', //分页显示多少条数据，字符串型
    show: true, //显示分页
    front: false //关闭前端分页，true是前端分页，false后端控制分页
  };

  constructor(
    private msg: NzMessageService,
    private http: _HttpClient,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    route: ActivatedRoute
  ) {
    this.cname = route.snapshot.queryParams['cname'] || '分公司';
  }
  ngOnInit(): void {
    this.refData();
    this.getDataEnergy();
    this.getDataRuntime();
  }

  getDataEnergy(): void {
    this.loading = true;
    const dDate = format(new Date(), 'yyyy-MM-dd');
    console.log(this.qpp);
    this.http
      .get('/cofco/prodkpi/getfactorbyDateAndOrgName', { cOrgName: this.cname, dDate: dDate, cKPIType: '动力能源' })
      .subscribe(res => {
        this.dataEnergy = res;
        // this.total = res.total;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  getDataRuntime(): void {
    this.loading = true;
    const dDate = format(new Date(), 'yyyy-MM-dd');
    console.log(this.qpp);
    this.http
      .get('/cofco/prodkpi/getfactorbyDateAndOrgName', { cOrgName: this.cname, dDate: dDate, cKPIType: '装置运行情况' })
      .subscribe(res => {
        this.updateAssetRuntime(res);
        // this.total = res.total;
        this.loading = false;
        this.cdr.detectChanges();
      });
  }

  updateAssetRuntime(arData: any): void {
    //var colorList = ['#22D7BB', '#24AAFF', '#5EDDF8', '#FCB840', '#F9D660'];

    var title = arData.map((item: any) => {
      return item.cKPIFactor;
    });
    var dataValue = arData.map((item: any) => {
      return item.iKPI;
    });
    var dataList = title.map((item: any, index: string | number) => {
      return {
        name: item,
        value: dataValue[index]
      };
    });
    var center = ['30%', '50%'];

    this.eoptionAssetRuntime = {
      // color: colorList,
      tooltip: {
        trigger: 'item',
        formatter: '{b} <br/> {c}',
        backgroundColor: 'rgba(67,100,247,0.8)',
        textStyle: {
          color: '#fff'
        },
        padding: [10, 10],
        axisPointer: {
          type: 'shadow',
          shadowStyle: {
            color: '#fff'
          }
        }
      },
      legend: {
        orient: 'vertical',
        right: '5%',
        top: 'middle',
        itemWidth: 13,
        itemHeight: 13,
        icon: 'circle',
        itemGap: 50,
        formatter(name: string) {
          let result = dataList.find((item: { name: string }) => item.name == name);
          return `{a|${result?.name}}|{b|${result?.value}}`;
        },
        textStyle: {
          color: '#000',
          rich: {
            a: {
              fontSize: 14,
              color: '#666',
              padding: [0, 10, 0, 6]
            },
            b: {
              fontSize: 14,
              color: '#666',
              padding: [0, 6, 0, 6]
            }
          }
        }
      },
      series: [
        // 边框
        {
          type: 'pie',
          center: center,
          radius: ['58%', '58.2%'], // 数组的第一项是内半径、第二项是外半径
          itemStyle: {
            color: '#CED5E1'
          },
          label: {
            show: false
          },
          data: [0]
        },

        // 外边设置
        {
          type: 'pie',
          center: center,
          radius: ['50%', '58%'], // 数组的第一项是内半径、第二项是外半径
          itemStyle: {
            color: 'rgba(206,213,225,0.1)'
          },
          label: {
            show: false
          },
          data: [0]
        },

        // 展示层
        {
          type: 'pie',
          center: center,
          radius: ['30%', '50%'],
          itemStyle: {
            borderWidth: 5, //描边线宽
            borderColor: '#fff'
          },
          label: {
            show: false
          },
          data: dataList
        }
      ]
    };
  }

  refData(): void {
    let XData = ['张浦', '锦溪', '巴城', '陆家', '千灯', '淀山湖', '花桥', '曹安', '石浦', '中华园'];
    let valueData = [1100, 900, 1000, 450, 1150, 950, 450, 450, 445, 1180];
    this.eoptionProdProcess = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          show: true,
          status: 'shadow',
          z: -1,
          shadowStyle: {
            color: '#E6F7FF'
          },
          type: 'shadow'
        }
      },
      grid: {
        top: '3%',
        left: '3%',
        right: '4%',
        bottom: '6%',
        containLabel: true
      },
      xAxis: [
        {
          position: 'bottom',
          type: 'category',
          axisLine: {
            show: true,
            lineStyle: {
              color: '#ECF1F6'
            }
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            rotate: 0,
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.72)'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#ECF1F6', '#ECF1F6'],
              width: 0,
              type: 'dashed'
            }
          },
          gridIndex: 0,
          data: XData
        }
      ],
      yAxis: [
        {
          type: 'value',
          position: 'left',
          minInterval: 200,
          // maxInterval: 5,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            show: true,
            rotate: 0,
            fontSize: 12,
            color: 'rgba(0, 0, 0, 0.72)'
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ['#ECF1F6', '#ECF1F6'],
              width: 1,
              type: 'solid'
            }
          }
        }
      ],
      dataZoom: [
        {
          show: true,
          height: 8,
          xAxisIndex: [0],
          bottom: 10,
          start: 10,
          end: 90,
          handleIcon: 'path://M306.1,413c0,2.2-1.8,4-4,4h-59.8c-2.2,0-4-1.8-4-4V200.8c0-2.2,1.8-4,4-4h59.8c2.2,0,4,1.8,4,4V413z',
          handleSize: '160%',
          handleStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              {
                offset: 0,
                color: '#fff'
              },
              {
                offset: 1,
                color: '#F0F5FA'
              }
            ]),
            borderColor: '#D1DCED'
          },
          textStyle: {
            color: '#333',
            fontSize: 14,
            zlevel: 10
          },
          borderColor: 'RGBA(221, 233, 242, 1)',
          backgroundColor: 'RGBA(221, 233, 242, 1)'
        },
        {
          type: 'inside',
          show: true,
          height: 5,
          start: 1,
          end: 35
        }
      ],
      series: [
        {
          name: '各派出所实有房屋数',
          type: 'bar',
          data: valueData,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgba(53, 157, 245, 1)'
                },
                {
                  offset: 1,
                  color: 'rgba(123, 200, 255, 1)'
                }
              ])
            }
          },
          barMaxWidth: '25%'
        }
      ]
    };
  }
  updateStatus(type: string, value: boolean): void {
    this.msg.info(`${type}: ${value}`);
  }

  render(er: ElementRef): void {
    this.ngZone.runOutsideAngular(() => this.init(er.nativeElement));
  }

  private init(container: HTMLElement): void {
    const chart = (this.chart = new Chart({
      container,
      autoFit: true,
      height: 200
    }));

    chart.scale('value', {
      nice: true
    });

    chart
      .interval()
      .position('month*value')
      .color('name', ['#00c1de', '#ff8a00', '#5D7092'])
      .adjust([
        {
          type: 'dodge',
          marginRatio: 0
        }
      ]);

    chart.interaction('active-region');

    chart.tooltip({
      showMarkers: false,
      shared: true
      // TODO: https://github.com/antvis/component/pull/160
      // offset: 50,
      // htmlContent: (title: string, items: any[]) => {
      //   const item1Price = +items[0].value;
      //   const item2Price = +items[1].value;
      //   const other = items[0].point._origin.other;
      //   return `<div class="g2-tooltip chart-tooltip">
      //     <div class="g2-tooltip-title" style="margin-bottom: 4px;">${title}</div>
      //     <div class="arrow"><span></span></div>
      //     <div class="content">
      //       <p>项目一：${item1Price}</p>
      //       <p>项目二：${item2Price}</p>
      //       <p>其他金额：${other}</p>
      //       <p>计算公式：${item1Price} + ${item2Price} = ${item1Price + item2Price}</p>
      //     </div>
      //   </div>`;
      // },
    });

    this.attachData();
  }

  private mockData(): NzSafeAny[] {
    // Mock data
    const data: any[] = [];
    for (let i = 0; i < 12; i++) {
      data.push(
        {
          name: '项目1',
          month: `${i + 1}月`,
          value: Random.integer(1, 1000)
        },
        {
          name: '项目2',
          month: `${i + 1}月`,
          value: Random.integer(1, 1000)
        },
        {
          name: '项目3',
          month: `${i + 1}月`,
          value: Random.integer(1, 1000)
        }
      );
    }

    return data;
  }

  private attachData(): void {
    const { chart } = this;
    const data = this.mockData();
    chart.changeData(data);

    this.stat.item1 = data.filter(w => w.name === '项目1').reduce((prev, cur) => (prev += cur.value), 0);
    this.stat.item2 = data.filter(w => w.name === '项目2').reduce((prev, cur) => (prev += cur.value), 0);
    this.stat.item3 = data.filter(w => w.name === '项目3').reduce((prev, cur) => (prev += cur.value), 0);
    this.cdr.detectChanges();
  }
}
