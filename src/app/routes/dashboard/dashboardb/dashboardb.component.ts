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
  selector: 'app-dashboard-dashboardb',
  templateUrl: './dashboardb.component.html',
  styleUrls: ['./dashboardb.component.less']
})
export class DashboardDashboardbComponent implements OnInit {
  gridStyle = {
    width: '25%',
    textAlign: 'center',
    padding: '2px'
  };
  gridStyle33 = {
    width: '33.3%',
    textAlign: 'center',
    padding: '10px',
    border: 'none'
  };
  cdate: string = '';

  interval$: any;

  dark = false;
  two = false;

  option1: any = {};
  option11: any = {};
  option12: any = {};
  option13: any = {};
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
  option66: any = {};
  option7: any = {};

  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    @Inject(DOCUMENT) private doc: NzSafeAny
  ) {
    // TODO: Wait for the page to load
    setTimeout(() => this.refData(), 1000);
    this.refOption11();
    this.refOption12();
    this.refOption13();
  }

  refOption11(): void {
    let angle = 0; //角度，用来做简单的动画效果的

    const value = 78; //今日完成78%
    const title = {
      text: '开机率',
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      padding: 0,
      top: 35,
      left: 'center'
    };
    const legend = {
      show: false
    };
    const tooltip = {
      show: false
    };
    const colors = ['#A098FC', '#4386FA', '#4FADFD', '#0CD3DB', '#646CF9'];
    const innerRingColor = {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [0, 0.3, 0.6, 0.8, 1].map((offset, index) => ({ offset, color: colors[index] })),
      global: false // 缺省为 false
    };
    this.option11 = {
      color: colors,
      title,
      tooltip,
      legend,

      series: [
        {
          name: '',
          type: 'pie',
          center: ['50%', '50%'], //圆心的位置
          radius: ['32%', '35%'], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
          avoidLabelOverlap: false, //做同心圆用到
          clockwise: false, //顺时针排列
          startAngle: 90, //起始角度 影响不大
          label: {
            show: true, //false不显示饼图上的标签
            position: 'center', //inside（在饼图上显示）,outside(默认就会出现引导线) center
            formatter: '{d}%',
            fontSize: 36,
            fontWeight: 'bold'
          },

          data: [
            { value: value, name: '完成', itemStyle: { color: innerRingColor, opacity: 1 } },
            { value: 100 - value, name: '未完成', itemStyle: { color: '#282c40' } }
          ].sort((a, b) => b.value - a.value), //数组从大到小排序

          emphasis: {
            scale: false
          }
        },
        {
          name: '',
          type: 'pie',
          center: ['50%', '50%'], //圆心的位置
          radius: ['40%', '50%'], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
          avoidLabelOverlap: false, //做同心圆用到
          clockwise: false, //顺时针排列
          startAngle: 90, //起始角度 影响不大

          label: {
            show: false //false不显示饼图上的标签
          },

          data: [
            { value: value, name: '完成', itemStyle: { color: innerRingColor, opacity: 1 } },
            { value: 100 - value, name: '未完成', itemStyle: { color: '#282c40' } }
          ].sort((a, b) => b.value - a.value), //数组从大到小排序

          emphasis: {
            scale: false
          }
        },
        //colors[0]line
        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                startAngle: ((0 + angle) * Math.PI) / 180,
                endAngle: ((90 + angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[0],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5', //        //colors[0]dot
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
            let point = getCirlPoint(x0, y0, r, 90 + angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[0],
                fill: colors[0]
              },
              silent: true
            };
          },
          data: [0]
        },
        // 蓝色

        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                startAngle: ((180 + angle) * Math.PI) / 180,
                endAngle: ((270 + angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[1],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5', // 蓝色
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
            let point = getCirlPoint(x0, y0, r, 180 + angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[1], //绿
                fill: colors[1]
              },
              silent: true
            };
          },
          data: [0]
        },

        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                startAngle: ((270 + -angle) * Math.PI) / 180,
                endAngle: ((40 + -angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[2],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        // 橘色

        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                startAngle: ((90 + -angle) * Math.PI) / 180,
                endAngle: ((220 + -angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[2],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
            let point = getCirlPoint(x0, y0, r, 90 + -angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[3], //粉
                fill: colors[3]
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5', //绿点
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
            let point = getCirlPoint(x0, y0, r, 270 + -angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[3], //绿
                fill: colors[3]
              },
              silent: true
            };
          },
          data: [0]
        }
      ]
    };

    //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    function getCirlPoint(x0: number, y0: number, r: number, angle: number) {
      let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
      let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
      return {
        x: x1,
        y: y1
      };
    }
  }
  refOption12(): void {
    let angle = 0; //角度，用来做简单的动画效果的

    const value = 88.8; //今日完成78%
    const title = {
      text: '运行率',
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      padding: 0,
      top: 35,
      left: 'center'
    };
    const legend = {
      show: false
    };
    const tooltip = {
      show: false
    };
    const colors = ['#A098FC', '#4386FA', '#4FADFD', '#0CD3DB', '#646CF9'];
    const innerRingColor = {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [0, 0.3, 0.6, 0.8, 1].map((offset, index) => ({ offset, color: colors[index] })),
      global: false // 缺省为 false
    };
    this.option12 = {
      color: colors,
      title,
      tooltip,
      legend,

      series: [
        {
          name: '',
          type: 'pie',
          center: ['50%', '50%'], //圆心的位置
          radius: ['32%', '35%'], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
          avoidLabelOverlap: false, //做同心圆用到
          clockwise: false, //顺时针排列
          startAngle: 90, //起始角度 影响不大
          label: {
            show: true, //false不显示饼图上的标签
            position: 'center', //inside（在饼图上显示）,outside(默认就会出现引导线) center
            formatter: '{d}%',
            fontSize: 36,
            fontWeight: 'bold'
          },

          data: [
            { value: value, name: '完成', itemStyle: { color: innerRingColor, opacity: 1 } },
            { value: 100 - value, name: '未完成', itemStyle: { color: '#282c40' } }
          ].sort((a, b) => b.value - a.value), //数组从大到小排序

          emphasis: {
            scale: false
          }
        },
        {
          name: '',
          type: 'pie',
          center: ['50%', '50%'], //圆心的位置
          radius: ['40%', '50%'], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
          avoidLabelOverlap: false, //做同心圆用到
          clockwise: false, //顺时针排列
          startAngle: 90, //起始角度 影响不大

          label: {
            show: false //false不显示饼图上的标签
          },

          data: [
            { value: value, name: '完成', itemStyle: { color: innerRingColor, opacity: 1 } },
            { value: 100 - value, name: '未完成', itemStyle: { color: '#282c40' } }
          ].sort((a, b) => b.value - a.value), //数组从大到小排序

          emphasis: {
            scale: false
          }
        },
        //colors[0]line
        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                startAngle: ((0 + angle) * Math.PI) / 180,
                endAngle: ((90 + angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[0],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5', //        //colors[0]dot
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
            let point = getCirlPoint(x0, y0, r, 90 + angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[0],
                fill: colors[0]
              },
              silent: true
            };
          },
          data: [0]
        },
        // 蓝色

        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                startAngle: ((180 + angle) * Math.PI) / 180,
                endAngle: ((270 + angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[1],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5', // 蓝色
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
            let point = getCirlPoint(x0, y0, r, 180 + angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[1], //绿
                fill: colors[1]
              },
              silent: true
            };
          },
          data: [0]
        },

        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                startAngle: ((270 + -angle) * Math.PI) / 180,
                endAngle: ((40 + -angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[2],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        // 橘色

        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                startAngle: ((90 + -angle) * Math.PI) / 180,
                endAngle: ((220 + -angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[2],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
            let point = getCirlPoint(x0, y0, r, 90 + -angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[3], //粉
                fill: colors[3]
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5', //绿点
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
            let point = getCirlPoint(x0, y0, r, 270 + -angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[3], //绿
                fill: colors[3]
              },
              silent: true
            };
          },
          data: [0]
        }
      ]
    };

    //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    function getCirlPoint(x0: number, y0: number, r: number, angle: number) {
      let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
      let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
      return {
        x: x1,
        y: y1
      };
    }
  }
  refOption13(): void {
    let angle = 0; //角度，用来做简单的动画效果的

    const value = 1.3; //今日完成78%
    const title = {
      text: '报警率',
      textStyle: {
        color: '#fff',
        fontSize: 16
      },
      padding: 0,
      top: 35,
      left: 'center'
    };
    const legend = {
      show: false
    };
    const tooltip = {
      show: false
    };
    const colors = ['#A098FC', '#4386FA', '#4FADFD', '#0CD3DB', '#646CF9'];
    const innerRingColor = {
      type: 'linear',
      x: 0,
      y: 0,
      x2: 0,
      y2: 1,
      colorStops: [0, 0.3, 0.6, 0.8, 1].map((offset, index) => ({ offset, color: colors[index] })),
      global: false // 缺省为 false
    };
    this.option13 = {
      color: colors,
      title,
      tooltip,
      legend,

      series: [
        {
          name: '',
          type: 'pie',
          center: ['50%', '50%'], //圆心的位置
          radius: ['32%', '35%'], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
          avoidLabelOverlap: false, //做同心圆用到
          clockwise: false, //顺时针排列
          startAngle: 90, //起始角度 影响不大
          label: {
            show: true, //false不显示饼图上的标签
            position: 'center', //inside（在饼图上显示）,outside(默认就会出现引导线) center
            formatter: '1.3%',
            fontSize: 36,
            fontWeight: 'bold'
          },

          data: [
            { value: value, name: '完成', itemStyle: { color: innerRingColor, opacity: 1 } },
            { value: 100 - value, name: '未完成', itemStyle: { color: '#282c40' } }
          ].sort((a, b) => a.value - b.value), //数组从大到小排序

          emphasis: {
            scale: false
          }
        },
        {
          name: '',
          type: 'pie',
          center: ['50%', '50%'], //圆心的位置
          radius: ['40%', '50%'], //环形图的本质就在这里 [内半径!=0，外半径] 外半径越大，圆越大
          avoidLabelOverlap: false, //做同心圆用到
          clockwise: false, //顺时针排列
          startAngle: 90, //起始角度 影响不大

          label: {
            show: false //false不显示饼图上的标签
          },

          data: [
            { value: value, name: '完成', itemStyle: { color: innerRingColor, opacity: 1 } },
            { value: 100 - value, name: '未完成', itemStyle: { color: '#282c40' } }
          ].sort((a, b) => a.value - b.value), //数组从大到小排序

          emphasis: {
            scale: false
          }
        },
        //colors[0]line
        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                startAngle: ((0 + angle) * Math.PI) / 180,
                endAngle: ((90 + angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[0],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5', //        //colors[0]dot
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
            let point = getCirlPoint(x0, y0, r, 90 + angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[0],
                fill: colors[0]
              },
              silent: true
            };
          },
          data: [0]
        },
        // 蓝色

        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6,
                startAngle: ((180 + angle) * Math.PI) / 180,
                endAngle: ((270 + angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[1],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5', // 蓝色
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.6;
            let point = getCirlPoint(x0, y0, r, 180 + angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[1], //绿
                fill: colors[1]
              },
              silent: true
            };
          },
          data: [0]
        },

        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                startAngle: ((270 + -angle) * Math.PI) / 180,
                endAngle: ((40 + -angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[2],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        // 橘色

        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65,
                startAngle: ((90 + -angle) * Math.PI) / 180,
                endAngle: ((220 + -angle) * Math.PI) / 180
              },
              style: {
                stroke: colors[2],
                fill: 'transparent',
                lineWidth: 1.5
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
            let point = getCirlPoint(x0, y0, r, 90 + -angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[3], //粉
                fill: colors[3]
              },
              silent: true
            };
          },
          data: [0]
        },
        {
          name: 'ring5', //绿点
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (params: any, api: { getWidth: () => number; getHeight: () => number }) {
            let x0 = api.getWidth() / 2;
            let y0 = api.getHeight() / 2;
            let r = (Math.min(api.getWidth(), api.getHeight()) / 2) * 0.65;
            let point = getCirlPoint(x0, y0, r, 270 + -angle);
            return {
              type: 'circle',
              shape: {
                cx: point.x,
                cy: point.y,
                r: 4
              },
              style: {
                stroke: colors[3], //绿
                fill: colors[3]
              },
              silent: true
            };
          },
          data: [0]
        }
      ]
    };

    //获取圆上面某点的坐标(x0,y0表示坐标，r半径，angle角度)
    function getCirlPoint(x0: number, y0: number, r: number, angle: number) {
      let x1 = x0 + r * Math.cos((angle * Math.PI) / 180);
      let y1 = y0 + r * Math.sin((angle * Math.PI) / 180);
      return {
        x: x1,
        y: y1
      };
    }
  }
  echartsIntance: any;

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
        top: 0,
        itemWidth: 14, //小圆点宽度
        itemHeight: 14, // 小圆点高度
        itemGap: 10, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
        textStyle: {
          fontSize: 14,
          color: '#ffffff'
        }
      },
      grid: {
        // 让图表占满容器
        left: '3%',
        right: '4%',
        bottom: '3%',
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
          width: 20
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
          stack: 'total',
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
          stack: 'total',
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
          stack: 'total',
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
          barWidth: 10,
          data: data2
        },
        {
          name: '电气',
          type: 'bar',
          stack: 'total',
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
          stack: 'total',
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
          stack: 'total',
          zlevel: 1,
          barCategoryGap: '10%',
          itemStyle: {
            normal: {
              barBorderRadius: 0,
              color: () => {
                // return colorList[params.dataIndex]
                return 'rgb(223,235,250)';
              }
            }
          },
          barWidth: 10,
          data: data2
        },
        {
          name: '',
          type: 'bar',
          barWidth: 20,
          barCategoryGap: '10%',
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
    const color3 = ['#03acd1', '#04cab7', '#03c781', '#fce348', '#fc2d8a', '#0292fe'];
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
            { value: 1048, name: '类型1' },
            { value: 735, name: '类型2' },
            { value: 580, name: '类型3' },
            { value: 484, name: '类型4' },
            { value: 300, name: '类型5' },
            { value: 600, name: '类型6' }
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
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
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
          max: 100,
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
          name: '保养和点巡检完成率',
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

    const posList = [
      'left',
      'right',
      'top',
      'bottom',
      'inside',
      'insideTop',
      'insideLeft',
      'insideRight',
      'insideBottom',
      'insideTopLeft',
      'insideTopRight',
      'insideBottomLeft',
      'insideBottomRight'
    ] as const;
    const chartapp: any = {};
    chartapp.configParameters = {
      rotate: {
        min: -90,
        max: 90
      },
      align: {
        options: {
          left: 'left',
          center: 'center',
          right: 'right'
        }
      },
      verticalAlign: {
        options: {
          top: 'top',
          middle: 'middle',
          bottom: 'bottom'
        }
      },
      position: {
        options: posList.reduce(function (map, pos) {
          map[pos] = pos;
          return map;
        }, {} as Record<string, string>)
      },
      distance: {
        min: 0,
        max: 100
      }
    };

    chartapp.config = {
      rotate: 90,
      align: 'left',
      verticalAlign: 'middle',
      position: 'insideBottom',
      distance: 15
    };

    type BarLabelOption = NonNullable<echarts.BarSeriesOption['label']>;

    const labelOption: BarLabelOption = {
      show: true,
      position: chartapp.config.position as BarLabelOption['position'],
      distance: chartapp.config.distance as BarLabelOption['distance'],
      align: chartapp.config.align as BarLabelOption['align'],
      verticalAlign: chartapp.config.verticalAlign as BarLabelOption['verticalAlign'],
      rotate: chartapp.config.rotate as BarLabelOption['rotate'],
      formatter: '{c}  {name|{a}}',
      fontSize: 16,
      rich: {
        name: {}
      }
    };

    this.option66 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      legend: {
        data: ['已创建', '已核准', '已归档', '已取消'],
        textStyle: {
          color: '#E5E9F0' //字体颜色
        }
      },
      xAxis: [
        {
          type: 'category',
          axisTick: { show: false },
          data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
          axisLabel: {
            textStyle: {
              color: '#E5E9F0' //字体颜色
            }
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLabel: {
            textStyle: {
              color: '#E5E9F0' //字体颜色
            }
          }
        }
      ],
      series: [
        {
          name: '已创建',
          type: 'bar',
          barGap: 0,
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [320, 332, 301, 334, 390]
        },
        {
          name: '已核准',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290]
        },
        {
          name: '已归档',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [150, 232, 201, 154, 190]
        },
        {
          name: '已取消',
          type: 'bar',
          label: labelOption,
          emphasis: {
            focus: 'series'
          },
          data: [98, 77, 101, 99, 40]
        }
      ]
    };
  }

  //图表初始化实例
  onChartInit(event: any) {
    this.echartsIntance = event;
    // this.echartsIntance.showLoading(this.default);
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
