import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnInit, Renderer2 } from '@angular/core';
import type { Chart } from '@antv/g2';
import { OnboardingService } from '@delon/abc/onboarding';
import { _HttpClient } from '@delon/theme';
import { format } from 'date-fns';
import * as echarts from 'echarts';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

@Component({
  selector: 'app-dashboard-dashboarda',
  templateUrl: './dashboarda.component.html',
  styleUrls: ['./dashboarda.component.less']
})
export class DashboardDashboardaComponent implements OnInit {
  cdate: string = '';

  interval$: any;

  dark = false;
  two = false;

  option1: any = {};

  option2: any = {};
  option3: any = {};

  webSite!: any[];
  salesData!: any[];
  offlineChartData!: any[];

  listOfData: any[] = [
    {
      key: '1',
      ordernumber: '127768',
      orderstatus: '已创建',
      ordername: '点巡检计划',
      orderhead: 'Will'
    },
    {
      key: '2',
      ordernumber: '127769',
      orderstatus: '已创建',
      ordername: '冷水泵故障',
      orderhead: 'Jay'
    },
    {
      key: '3',
      ordernumber: '127770',
      orderstatus: '已创建',
      ordername: '箱式电阻炉故障',
      orderhead: 'Jay'
    },
    {
      key: '4',
      ordernumber: '127771',
      orderstatus: '等待备件',
      ordername: '封口宕机',
      orderhead: 'Jack'
    }
  ];
  option4: any = {};
  option5: any = {};
  option6: any = {};
  option7: any = {};

  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    @Inject(DOCUMENT) private doc: NzSafeAny
  ) {
    // TODO: Wait for the page to load
    setTimeout(() => this.refData(), 1000);
  }

  fixDark(chart: Chart): void {
    if (!this.platform.isBrowser || (this.doc.body as HTMLBodyElement).getAttribute('data-theme') !== 'dark') return;

    chart.theme({
      styleSheet: {
        backgroundColor: 'transparent'
      }
    });
  }
  refData(): void {
    let color = ['#0E7CE2', '#FF8352', '#E271DE', '#F8456B', '#00FFFF', '#4AEAB0'];
    let echartData = [
      {
        name: '瓶颈设备',
        value: '35'
      },
      {
        name: '关键设备',
        value: '25'
      },
      {
        name: '一般设备',
        value: '80'
      },
      {
        name: '其他设备',
        value: '20'
      }
    ];
    let formatNumber = function (num: { toString: () => string }) {
      let reg = /(?=(\B)(\d{3})+$)/g;
      return num.toString().replace(reg, ',');
    };
    this.option1 = {
      color: color,
      title: [
        {
          text: '设备数',
          x: 'center',
          top: '42%',
          textStyle: {
            color: '#fff',
            fontSize: 30,
            fontWeight: '100'
          }
        },
        {
          text: '160',
          x: 'center',
          top: '50%',
          textStyle: {
            fontSize: 48,
            color: '#00f0ff',
            foontWeight: '500'
          }
        }
      ],
      polar: {
        radius: ['44%', '50%'],
        center: ['50%', '50%']
      },
      angleAxis: {
        max: 100,
        show: false
      },
      radiusAxis: {
        type: 'category',
        show: true,
        axisLabel: {
          show: false
        },
        axisLine: {
          show: false
        },
        axisTick: {
          show: false
        }
      },
      series: [
        {
          type: 'pie',
          radius: ['55%', '67%'],
          center: ['50%', '50%'],
          data: echartData,
          hoverAnimation: false,
          itemStyle: {
            normal: {
              borderColor: '#364684',
              borderWidth: 2
            }
          },
          labelLine: {
            normal: {
              length: 10,
              length2: 10,
              lineStyle: {
                color: '#e6e6e6'
              }
            }
          },
          label: {
            normal: {
              formatter: (params: { name: any; value: { toString: () => string } }) => {
                return `{icon|●}{name|${params.name}}\n{value|${formatNumber(params.value)}}`;
              },
              padding: [0, -10, 0, -10],
              rich: {
                icon: {
                  fontSize: 16,
                  align: 'left',
                  padding: [4, 0, 0, 0]
                },
                name: {
                  fontSize: 14,
                  align: 'left',
                  padding: [4, 0, 0, 0],
                  color: '#fff'
                },
                value: {
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#fff',
                  align: 'left'
                }
              }
            }
          }
        },
        {
          name: '',
          type: 'pie',
          startAngle: 90,
          radius: '50%',
          hoverAnimation: false,
          center: ['50%', '50%'],
          itemStyle: {
            normal: {
              labelLine: {
                show: false
              },
              color: new echarts.graphic.RadialGradient(0.5, 0.5, 1, [
                {
                  offset: 1,
                  color: 'rgba(50,171,241, 1)'
                },
                {
                  offset: 0,
                  color: 'rgba(55,70,130, 0)'
                }
              ]),
              // borderWidth: 1,
              // borderColor: '',
              shadowBlur: 10
              // shadowColor: 'rgba(55,70,130, 1)'
            }
          },
          data: [
            {
              value: 100
            }
          ]
        }
      ]
    };

    var data2 = [10, 14, 10, 12, 16, 14, 9];
    var className = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
    var colorList = ['#39B3FF', '#47E0E0', '#7891D9', '#83D978', '#C7A530', '#FF8439'];
    var defaultData = [100, 100, 100, 100, 100, 100, 100];
    this.option2 = {
      legend: {
        //data，就是取得每个series里面的name属性。
        orient: 'horizontal',
        icon: 'circle', //图例形状
        padding: 0,
        bottom: 'center',
        top: 10,
        itemWidth: 14, //小圆点宽度
        itemHeight: 14, // 小圆点高度
        itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
        textStyle: {
          fontSize: 14,
          color: '#ffffff'
        }
      },
      grid: {
        left: '5%',
        right: '5%',
        bottom: '5%',
        top: '10%',
        containLabel: true
      },
      tooltip: {
        show: false,
        trigger: 'axis',
        axisPointer: {
          type: 'none'
        },
        formatter: function (params: Array<{ name: string; seriesName: string; value: string }>) {
          return (
            `${params[0].name}<br/>` +
            `<span style='display:inline-block;margin-right:5px;border-radius:10px;width:9px;height:9px;background-color:rgba(36,207,233,0.9)'></span>${params[0].seriesName} : ${params[0].value}`
          );
        }
      },
      // backgroundColor: 'rgb(20,28,52)',
      xAxis: {
        axisLabel: {
          color: '#E5E9F0', //字体颜色
          width: 100
        },
        // show: false,
        type: 'value',
        splitLine: {
          show: false //刻度线
        },
        axisTick: {
          show: false //刻度点
        },
        axisLine: {
          show: false //是否显示坐标轴轴线

          // lineStyle: {
          //     color: 'rgb(28,136,190)',
          //     color: '#fff',//字体颜色
          //     width: 1
          // }
        },
        data: defaultData
      },
      yAxis: [
        {
          type: 'category',
          inverse: true,
          axisLabel: {
            show: true,
            textStyle: {
              color: '#E5E9F0' //字体颜色
            }
          },
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },

          data: className
        },
        {
          type: 'category',
          inverse: true,
          axisTick: 'none',
          axisLine: 'none',
          show: true,
          axisLabel: {
            textStyle: {
              color: '#ffffff',
              fontSize: '12'
            },
            formatter: function (value: string) {
              return `${value} %`; //柱状图后面跟百分比
            }
          },
          data: data2
        }
      ],
      series: [
        {
          name: '通用',
          type: 'bar',
          stack: 'aa',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 0,
              color: () => {
                // return colorList[params.dataIndex]
                return 'rgb(1,160,234)';
              }
            }
          },
          barWidth: 20,
          data: data2
        },
        {
          name: '动力',
          type: 'bar',
          stack: 'aa',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 0,
              color: () => {
                // return colorList[params.dataIndex]
                return 'rgb(145,203,116)';
              }
            }
          },
          barWidth: 20,
          data: data2
        },
        {
          name: '机械',
          type: 'bar',
          stack: 'aa',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 0,
              color: () => {
                // return colorList[params.dataIndex]
                return 'rgb(250,200,89)';
              }
            }
          },
          barWidth: 20,
          data: data2
        },
        {
          name: '电气',
          type: 'bar',
          stack: 'aa',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 0,
              color: () => {
                // return colorList[params.dataIndex]
                return 'rgb(255,144,1)';
              }
            }
          },
          barWidth: 20,
          data: data2
        },
        {
          name: '安全和控制',
          type: 'bar',
          stack: 'aa',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 0,
              color: () => {
                // return colorList[params.dataIndex]
                return 'rgb(2,235,250)';
              }
            }
          },
          barWidth: 20,
          data: data2
        },
        {
          name: '能源动力',
          type: 'bar',
          stack: 'aa',
          zlevel: 1,
          itemStyle: {
            normal: {
              barBorderRadius: 0,
              color: () => {
                // return colorList[params.dataIndex]
                return 'rgb(223,235,250)';
              }
            }
          },
          barWidth: 20,
          data: data2
        },
        {
          name: '',
          type: 'bar',
          barWidth: 20,
          barGap: '-100%',
          data: defaultData,
          itemStyle: {
            normal: {
              color: '#1B375E',
              barBorderRadius: 0
            }
          }
        }
      ]
    };
    const title = {
      text: '',
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      padding: 0,
      top: 35,
      left: 'center'
    };
    const legend = {
      //data，就是取得每个series里面的name属性。
      orient: 'vertical',
      icon: 'circle', //图例形状
      padding: 0,
      bottom: 'center',
      right: 40,
      itemWidth: 14, //小圆点宽度
      itemHeight: 14, // 小圆点高度
      itemGap: 21, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
      textStyle: {
        fontSize: 14,
        color: '#ffffff'
      }
    };
    const tooltip = {
      show: true,
      formatter: '{b}:{d}%'
    };
    const color3 = ['#22E5D1', '#04cab7', '#03c781', '#fce348', '#fc2d8a', '#0292fe'];
    this.option3 = {
      color3,
      title,
      tooltip,
      legend,

      series: [
        {
          name: '工单类型分布',
          type: 'pie',
          center: ['50%', '50%'], //圆心的位置
          top: '2%', //单单指的饼图距离上面的距离，top越大饼图越小
          left: '0%', //单单指的饼图距离左面的距离，会改变饼图的大小
          radius: ['40%', '70%'], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
          avoidLabelOverlap: false, //做同心圆用到
          clockwise: true, //顺时针排列
          startAngle: 90, //起始角度 影响不大
          //roseType:"", // 实心圆 不能出现roseType这个属性

          label: {
            show: false, //false不显示饼图上的标签
            position: 'center', //inside（在饼图上显示）,outside(默认就会出现引导线) center
            formatter: '{b}:{c}'
          },

          itemStyle: {
            //每个扇形的设置
            borderColor: 'rgba(0,0,0,.1)', //扇形边框颜色
            borderWidth: 1 //扇形边框大小 要先给borderColor颜色 设置borderWidth才会有效果
          },
          data: [
            { value: 358, name: '已创建' },
            { value: 13, name: '等待备件' },
            { value: 15, name: '已安排' },
            { value: 77, name: '进行中' },
            { value: 8, name: '已完成' },
            { value: 21, name: '已确认' }
          ].sort((a, b) => b.value - a.value), //数组从大到小排序

          emphasis: {
            scale: true,
            scaleSize: 10,
            //同心圆单独加上的
            label: {
              show: true,
              fontSize: 24,
              fontWeight: 'bold'
            },
            //启用鼠标放上去放大效果，这个挺好的
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    };

    this.option4 = {
      grid: {
        // 让图表占满容器
        top: '20px',
        left: '40px',
        right: '20px',
        bottom: '20px'
      },
      xAxis: {
        type: 'category',
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        axisLabel: {
          textStyle: {
            color: '#E5E9F0'
          }
        }
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          textStyle: {
            color: '#E5E9F0'
          }
        }
      },
      series: [
        {
          data: [35, 23, 24, 21, 35, 14, 26],
          type: 'line',
          itemStyle: {
            color: '#22E5D1'
          }
        }
      ]
    };
    this.option5 = {
      xAxis: {
        max: 'dataMax',
        axisLabel: {
          textStyle: {
            color: '#E5E9F0'
          }
        }
      },
      yAxis: {
        type: 'category',
        data: ['可用性', '性能', '质量'],
        inverse: true,
        animationDuration: 300,
        animationDurationUpdate: 300,
        max: 2, // only the largest 3 bars will be displayed
        axisLabel: {
          textStyle: {
            color: '#E5E9F0'
          }
        }
      },
      series: [
        {
          realtimeSort: true,
          name: '产线OEE',
          type: 'bar',
          itemStyle: {
            color: '#22E5D1'
          },
          data: [91.93, 96.36, 95],
          label: {
            show: true,
            position: 'right',
            formatter: '{c} %'
          },
          axisLabel: {
            textStyle: {
              color: '#E5E9F0'
            }
          }
        }
      ],
      legend: {
        show: true,
        textStyle: {
          fontSize: 14,
          color: '#E5E9F0'
        }
      },
      animationDuration: 0,
      animationDurationUpdate: 3000,
      animationEasing: 'linear',
      animationEasingUpdate: 'linear'
    };

    this.option6 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross',
          crossStyle: {
            color: '#999'
          }
        }
      },
      legend: {
        show: true,
        textStyle: {
          fontSize: 14,
          color: '#E5E9F0'
        }
      },
      xAxis: [
        {
          type: 'category',
          data: ['车间1', '车间2', '车间3', '车间4', '车间5', '车间6', '车间7'],
          axisPointer: {
            type: 'shadow'
          },
          axisLabel: {
            textStyle: {
              color: '#E5E9F0'
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          name: '%',
          min: 0,
          max: 250,
          interval: 50,
          axisLabel: {
            formatter: '{value} %',
            textStyle: {
              color: '#E5E9F0' //字体颜色
            }
          }
        }
      ],
      series: [
        {
          name: '车间 OEE',
          type: 'bar',
          itemStyle: {
            color: '#22E5D1'
          },
          tooltip: {
            valueFormatter: function (value: any) {
              return `${value} ml`;
            }
          },
          data: [78.1, 75, 88, 44, 55, 66, 76]
        }
      ]
    };
  }

  ngOnInit(): void {
    this.interval$ = setInterval(() => {
      const newdate = new Date();
      this.cdate = format(newdate, 'yyyy-MM-dd HH:mm:ss');
    }, 1000);

    const visitData: any[] = [];
    const beginDay = new Date().getTime();

    const fakeY = [7, 5, 4, 2, 4, 7, 5, 6, 5, 9, 6, 3, 1, 5, 3, 6, 5];
    for (let i = 0; i < fakeY.length; i += 1) {
      visitData.push({
        x: format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'yyyy-MM-dd'),
        y: fakeY[i]
      });
    }

    const visitData2: any[] = [];
    const fakeY2 = [1, 6, 4, 8, 3, 7, 2];
    for (let i = 0; i < fakeY2.length; i += 1) {
      visitData2.push({
        x: format(new Date(beginDay + 1000 * 60 * 60 * 24 * i), 'yyyy-MM-dd'),
        y: fakeY2[i]
      });
    }

    const salesData: any[] = [];
    for (let i = 0; i < 12; i += 1) {
      salesData.push({
        x: `${i + 1}月`,
        y: Math.floor(Math.random() * 1000) + 200
      });
    }
    const searchData: any[] = [];
    for (let i = 0; i < 50; i += 1) {
      searchData.push({
        index: i + 1,
        keyword: `搜索关键词-${i}`,
        count: Math.floor(Math.random() * 1000),
        range: Math.floor(Math.random() * 100),
        status: Math.floor((Math.random() * 10) % 2)
      });
    }
    const salesTypeData = [
      {
        x: '家用电器',
        y: 4544
      },
      {
        x: '食用酒水',
        y: 3321
      },
      {
        x: '个护健康',
        y: 3113
      },
      {
        x: '服饰箱包',
        y: 2341
      },
      {
        x: '母婴产品',
        y: 1231
      },
      {
        x: '其他',
        y: 1231
      }
    ];

    const salesTypeDataOnline = [
      {
        x: '家用电器',
        y: 244
      },
      {
        x: '食用酒水',
        y: 321
      },
      {
        x: '个护健康',
        y: 311
      },
      {
        x: '服饰箱包',
        y: 41
      },
      {
        x: '母婴产品',
        y: 121
      },
      {
        x: '其他',
        y: 111
      }
    ];

    const salesTypeDataOffline = [
      {
        x: '家用电器',
        y: 99
      },
      {
        x: '个护健康',
        y: 188
      },
      {
        x: '服饰箱包',
        y: 344
      },
      {
        x: '母婴产品',
        y: 255
      },
      {
        x: '其他',
        y: 65
      }
    ];

    const offlineData: any[] = [];
    for (let i = 0; i < 10; i += 1) {
      offlineData.push({
        name: `门店${i}`,
        cvr: Math.ceil(Math.random() * 9) / 10
      });
    }
    const offlineChartData: any[] = [];
    for (let i = 0; i < 20; i += 1) {
      offlineChartData.push({
        time: new Date().getTime() + 1000 * 60 * 30 * i,
        y1: Math.floor(Math.random() * 100) + 10,
        y2: Math.floor(Math.random() * 100) + 10
      });
    }

    const radarOriginData = [
      {
        name: '个人',
        ref: 10,
        koubei: 8,
        output: 4,
        contribute: 5,
        hot: 7
      },
      {
        name: '团队',
        ref: 3,
        koubei: 9,
        output: 6,
        contribute: 3,
        hot: 1
      },
      {
        name: '部门',
        ref: 4,
        koubei: 1,
        output: 6,
        contribute: 5,
        hot: 7
      }
    ];

    //
    const radarData: any[] = [];
    const radarTitleMap: any = {
      ref: '引用',
      koubei: '口碑',
      output: '产量',
      contribute: '贡献',
      hot: '热度'
    };
    radarOriginData.forEach((item: any) => {
      Object.keys(item).forEach(key => {
        if (key !== 'name') {
          radarData.push({
            name: item.name,
            label: radarTitleMap[key],
            value: item[key]
          });
        }
      });
    });

    // endregion

    this.webSite = visitData.slice(0, 10);
    this.salesData = salesData;
    this.offlineChartData = offlineChartData;
    this.cdr.detectChanges();
  }

  export(): void {
    console.log('temp');
  }
}
