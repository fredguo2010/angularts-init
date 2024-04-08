import { Platform } from '@angular/cdk/platform';
import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Directive,
  Inject,
  Input,
  OnInit,
  Renderer2
} from '@angular/core';
import type { Chart } from '@antv/g2';
import { _HttpClient } from '@delon/theme';
import { format } from 'date-fns';
import * as echarts from 'echarts';
import { NzSafeAny } from 'ng-zorro-antd/core/types';

interface DataItem {
  name: string;
  value: number;
}

@Component({
  selector: 'app-dashboard-dashboardc',
  templateUrl: './dashboardc.component.html',
  styleUrls: ['./dashboardc.component.less']
})
export class DashboardDashboardcComponent implements OnInit {
  gridStyle = {
    width: '50%',
    textAlign: 'center',
    padding: '2px',
    border: 'none'
  };

  gridStyle33 = {
    width: '33.33%',
    textAlign: 'center',
    padding: '2px',
    border: 'none'
  };

  cdate: string = '';
  dark = false;
  two = false;

  option1: any = {};
  option11: any = {};
  option12: any = {};
  option13: any = {};
  option2: any = {};
  option3: any = {};
  option4: any = {};
  option5: any = {};
  option6: any = {};
  option7: any = {};

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
    }
  ];
  constructor(
    private http: _HttpClient,
    private cdr: ChangeDetectorRef,
    private platform: Platform,
    @Inject(DOCUMENT) private doc: NzSafeAny
  ) {
    // TODO: Wait for the page to load
    setTimeout(() => this.refData(), 1000);
    setTimeout(() => this.refData1(), 1000);
    setTimeout(() => this.refOption11(), 1000);
    setTimeout(() => this.refOption12(), 1000);
    setTimeout(() => this.refOption13(), 1000);
  }
  echartsIntance: any;
  refData1(): void {
    this.http.get('assets/geodata.json?_allow_anonymous=true').subscribe(geoJson => {
      echarts.registerMap('china', geoJson);
      // this.option3 = {
      //   tooltip: {
      //     trigger: 'item',
      //     backgroundColor: 'rgba(166, 200, 76, 0.82)',
      //     borderColor: '#FFFFCC',
      //     showDelay: 0,
      //     hideDelay: 0,
      //     enterable: true,
      //     transitionDuration: 0,
      //     extraCssText: 'z-index:100'
      //   },
      //   visualMap: {
      //     min: 0,
      //     max: 1,
      //     calculable: true,
      //     show: false,
      //     color: ['#f44336', '#fc9700', '#ffde00', '#ffde00', '#00eaff'],
      //     textStyle: {
      //       color: '#fff'
      //     }
      //   },
      //   geo: {
      //     map: 'china',
      //     zoom: 1.2,
      //     label: {
      //       emphasis: {
      //         show: false
      //       }
      //     },
      //     roam: true,
      //     itemStyle: {
      //       normal: {
      //         color: 'rgba(51, 69, 89, .5)',
      //         borderColor: '#516a89',
      //         borderWidth: 1
      //       },
      //       emphasis: {
      //         color: 'rgba(37, 43, 61, .5)'
      //       }
      //     }
      //   },
      //   series: [
      //     {
      //       type: 'lines',
      //       zlevel: 2,
      //       effect: {
      //         show: true,
      //         period: 4,
      //         trailLength: 0.02,
      //         symbol: 'arrow',
      //         symbolSize: 5
      //       },
      //       lineStyle: {
      //         normal: {
      //           width: 1,
      //           opacity: 1,
      //           curveness: 0.3
      //         }
      //       },
      //       data: [
      //         [
      //           {
      //             coord: [127.9688, 45.368],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [110.3467, 41.4899],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [125.8154, 44.2584],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [123.1238, 42.1216],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [114.4995, 38.1006],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [117.4219, 39.4189],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [112.3352, 37.9413],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [109.1162, 34.2004],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [103.5901, 36.3043],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [106.3586, 38.1775],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [101.4038, 36.8207],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [87.9236, 43.5883],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [91.11, 29.97],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [103.9526, 30.7617],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [108.384366, 30.439702],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [117.1582, 36.8701],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [113.4668, 34.6234],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [118.8062, 31.9208],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [117.29, 32.0581],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [114.3896, 30.6628],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [121.4648, 31.2891],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [119.4543, 25.9222],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [116.0046, 28.6633],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [113.0823, 28.2568],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [106.6992, 26.7682],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [108.479, 23.1152],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [110.3893, 19.8516],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ],
      //         [
      //           {
      //             coord: [119.5313, 29.8773],
      //             value: 0
      //           },
      //           {
      //             coord: [121.4648, 31.2891]
      //           }
      //         ]
      //       ]
      //     },
      //     {
      //       type: 'scatter',
      //       coordinateSystem: 'geo',
      //       zlevel: 2,
      //       rippleEffect: {
      //         period: 4,
      //         brushType: 'stroke',
      //         scale: 4
      //       },
      //       label: {
      //         normal: {
      //           show: true,
      //           position: 'right',
      //           color: '#0f0',
      //           formatter: '{b}',
      //           textStyle: {
      //             color: '#0f0'
      //           }
      //         },
      //         emphasis: {
      //           show: true,
      //           color: '#f60'
      //         }
      //       },
      //       symbol: 'pin',
      //       symbolSize: 50,
      //       data: [
      //         {
      //           name: '上海',
      //           value: [121.4648, 31.2891, 1]
      //         }
      //       ]
      //     }
      //   ]
      // };
      var geoCoordMap: Record<string, number[]> = {
        杭州: [119.5313, 29.8773],
        苏州: [118.8062, 31.9208],
        上海: [121.4648, 31.2891],
        天津: [117.4219, 39.4189],
        深圳: [114.072026, 22.552194],
        成都: [103.9526, 30.7617],
        郑州: [113.4668, 34.6234],
        宁波: [121.640618, 29.86206],
        合肥: [117.29, 32.0581],
        重庆: [108.384366, 30.439702],
        广州: [113.12244, 23.009505],
        大连: [123.1238, 42.1216],
        青岛: [117.1582, 36.8701],
        北京: [116.4551, 40.2539],
        义乌: [120.067209, 29.346921],
        东莞: [113.764742, 23.02039],
        长沙: [113.0823, 28.2568],
        贵阳: [106.6992, 26.7682],
        珠海: [113.556111, 22.250876],
        威海: [122.109148, 37.516889],
        泉州: [118.58, 24.93],
        赤峰: [118.87, 42.28],
        厦门: [118.1, 24.46],
        福州: [119.3, 26.08],
        抚顺: [123.97, 41.97],
        汕头: [116.69, 23.39],
        海口: [110.35, 20.02],
        岳阳: [113.09, 29.37],
        武汉: [114.31, 30.52],
        唐山: [118.02, 39.63],
        石家庄: [114.48, 38.03],
        哈尔滨: [126.63, 45.75],
        兰州: [103.73, 36.03],
        呼和浩特: [111.65, 40.82],
        南昌: [115.89, 28.68],
        佛山: [113.11, 23.05],
        烟台: [121.39, 37.52]
      };

      //2019年数据
      var d1: any = {
        杭州: 80.33,
        苏州: 79.25,
        上海: 72.5,
        天津: 100.08,
        深圳: 80,
        郑州: 70,
        成都: 85,
        宁波: 87,
        合肥: 81,
        重庆: 73,
        广州: 69,
        大连: 71,
        青岛: 81,
        北京: 96,
        义乌: 92,
        东莞: 71,
        长沙: 73,
        贵阳: 70,
        珠海: 70,
        威海: 80,
        南昌: 91,
        西安: 72,
        南京: 86,
        海口: 90,
        厦门: 83,
        沈阳: 83,
        无锡: 70,
        呼和浩特: 80,
        长春: 80,
        哈尔滨: 71,
        武汉: 85,
        南宁: 91,
        昆明: 51,
        兰州: 60,
        唐山: 60,
        石家庄: 82,
        太原: 61,
        赤峰: 80,
        抚顺: 80,
        珲春: 70,
        绥芬河: 70,
        徐州: 80,
        南通: 71,
        温州: 82,
        绍兴: 60,
        芜湖: 60,
        福州: 65,
        泉州: 72,
        赣州: 72,
        济南: 73,
        烟台: 80,
        洛阳: 81,
        黄石: 80,
        岳阳: 70,
        汕头: 70,
        佛山: 80,
        泸州: 80,
        海东: 70,
        银川: 80
      };

      //2020年数据
      var d2: any = {
        杭州: 67.5,
        苏州: 86,
        上海: 67.92,
        天津: 90.33,
        深圳: 104,
        郑州: 66,
        成都: 35,
        宁波: 59,
        合肥: 87,
        重庆: 68,
        广州: 100,
        大连: 85,
        青岛: 58,
        北京: 87,
        义乌: 60,
        东莞: 46,
        长沙: 67,
        贵阳: 78,
        珠海: 71,
        威海: 67,
        南昌: 54,
        西安: 75,
        南京: 52,
        海口: 76,
        厦门: 59,
        沈阳: 78,
        无锡: 71,
        呼和浩特: 77,
        长春: 63,
        哈尔滨: 86,
        武汉: 52,
        南宁: 94,
        昆明: 70,
        兰州: 75,
        唐山: 53,
        石家庄: 74,
        太原: 83,
        赤峰: 70,
        抚顺: 60,
        珲春: 81,
        绥芬河: 93,
        徐州: 75,
        南通: 52,
        温州: 72,
        绍兴: 81,
        芜湖: 93,
        福州: 72,
        泉州: 77,
        赣州: 73,
        济南: 70,
        烟台: 64,
        洛阳: 77,
        黄石: 71,
        岳阳: 81,
        汕头: 78,
        佛山: 71,
        泸州: 70,
        海东: 70,
        银川: 87
      };
      //2021年数据
      var d3: any = {
        杭州: 68.18,
        苏州: 69.55,
        上海: 62.27,
        天津: 76.92,
        深圳: 99,
        郑州: 94,
        成都: 79,
        宁波: 91,
        合肥: 30,
        重庆: 89,
        广州: 45,
        大连: 39,
        青岛: 82,
        北京: 86,
        义乌: 76,
        东莞: 59,
        长沙: 51,
        贵阳: 81,
        珠海: 96,
        威海: 80,
        南昌: 72,
        西安: 63,
        南京: 55,
        海口: 59,
        厦门: 70,
        沈阳: 72,
        无锡: 110,
        呼和浩特: 54,
        长春: 76,
        哈尔滨: 83,
        武汉: 87,
        南宁: 104,
        昆明: 100,
        兰州: 48,
        唐山: 48,
        石家庄: 110,
        太原: 80,
        赤峰: 87,
        抚顺: 77,
        珲春: 79,
        绥芬河: 76,
        徐州: 63,
        南通: 78,
        温州: 81,
        绍兴: 88,
        芜湖: 79,
        福州: 89,
        泉州: 48,
        赣州: 71,
        济南: 61,
        烟台: 85,
        洛阳: 79,
        黄石: 70,
        岳阳: 85,
        汕头: 74,
        佛山: 53,
        泸州: 80,
        海东: 70,
        银川: 94
      };
      //2018年数据
      var d4: any = {
        杭州: 296,
        苏州: 184,
        上海: 332,
        天津: 136,
        深圳: 327,
        郑州: 208,
        成都: 235,
        宁波: 200,
        合肥: 142,
        重庆: 191,
        广州: 327,
        大连: 154,
        青岛: 168,
        北京: 358,
        义乌: 133,
        东莞: 166,
        长沙: 159,
        贵阳: 81,
        珠海: 86,
        威海: 58,
        南昌: 118,
        西安: 180,
        南京: 170,
        海口: 78,
        厦门: 160,
        沈阳: 114,
        无锡: 119,
        呼和浩特: 80,
        长春: 92,
        哈尔滨: 123,
        武汉: 190,
        南宁: 122,
        昆明: 128,
        兰州: 69,
        唐山: 60,
        石家庄: 118,
        太原: 93,
        赤峰: 16,
        抚顺: 9,
        珲春: 21,
        绥芬河: 16,
        徐州: 78,
        南通: 93,
        温州: 122,
        绍兴: 95,
        芜湖: 36,
        福州: 187,
        泉州: 148,
        赣州: 47,
        济南: 161,
        烟台: 87,
        洛阳: 55,
        黄石: 11,
        岳阳: 26,
        汕头: 78,
        佛山: 150,
        泸州: 10,
        海东: 0,
        银川: 45
      };
      //2019年数据
      var d5: any = {
        杭州: 80.33333333,
        苏州: 79.25,
        上海: 72.5,
        天津: 181,
        深圳: 379,
        郑州: 231,
        成都: 215,
        宁波: 183,
        合肥: 145,
        重庆: 205,
        广州: 344,
        大连: 166,
        青岛: 170,
        北京: 351,
        义乌: 150,
        东莞: 176,
        长沙: 174,
        贵阳: 89,
        珠海: 91,
        威海: 61,
        南昌: 135,
        西安: 181,
        南京: 183,
        海口: 80,
        厦门: 167,
        沈阳: 130,
        无锡: 121,
        呼和浩特: 89,
        长春: 122,
        哈尔滨: 139,
        武汉: 219,
        南宁: 138,
        昆明: 125,
        兰州: 71,
        唐山: 71,
        石家庄: 136,
        太原: 127,
        赤峰: 47,
        抚顺: 9,
        珲春: 30,
        绥芬河: 21,
        徐州: 88,
        南通: 90,
        温州: 138,
        绍兴: 92,
        芜湖: 26,
        福州: 283,
        泉州: 158,
        赣州: 30,
        济南: 171,
        烟台: 81,
        洛阳: 86,
        黄石: 15,
        岳阳: 41,
        汕头: 96,
        佛山: 165,
        泸州: 49,
        海东: 0,
        银川: 70
      };
      //2020年数据
      var d6: any = {
        杭州: 67.5,
        苏州: 86,
        上海: 67.91666667,
        天津: 187,
        深圳: 430,
        郑州: 251,
        成都: 226,
        宁波: 196,
        合肥: 165,
        重庆: 234,
        广州: 364,
        大连: 151,
        青岛: 193,
        北京: 358,
        义乌: 162,
        东莞: 197,
        长沙: 212,
        贵阳: 94,
        珠海: 108,
        威海: 70,
        南昌: 167,
        西安: 188,
        南京: 203,
        海口: 102,
        厦门: 187,
        沈阳: 148,
        无锡: 133,
        呼和浩特: 88,
        长春: 121,
        哈尔滨: 143,
        武汉: 224,
        南宁: 153,
        昆明: 144,
        兰州: 77,
        唐山: 98,
        石家庄: 150,
        太原: 147,
        赤峰: 16,
        抚顺: 16,
        珲春: 31,
        绥芬河: 18,
        徐州: 98,
        南通: 106,
        温州: 153,
        绍兴: 112,
        芜湖: 36,
        福州: 196,
        泉州: 178,
        赣州: 71,
        济南: 165,
        烟台: 88,
        洛阳: 78,
        黄石: 14,
        岳阳: 39,
        汕头: 115,
        佛山: 185,
        泸州: 12,
        海东: 1,
        银川: 49
      };
      //2021年数据
      var d7: any = {
        杭州: 68.18181818,
        苏州: 69.54545455,
        上海: 62.27272727,
        天津: 168,
        深圳: 421,
        郑州: 271,
        成都: 231,
        宁波: 199,
        合肥: 172,
        重庆: 141,
        广州: 365,
        大连: 132,
        青岛: 205,
        北京: 239,
        义乌: 147,
        东莞: 193,
        长沙: 213,
        贵阳: 105,
        珠海: 99,
        威海: 76,
        南昌: 163,
        西安: 184,
        南京: 193,
        海口: 109,
        厦门: 170,
        沈阳: 147,
        无锡: 138,
        呼和浩特: 81,
        长春: 126,
        哈尔滨: 141,
        武汉: 241,
        南宁: 154,
        昆明: 145,
        兰州: 89,
        唐山: 103,
        石家庄: 146,
        太原: 137,
        赤峰: 33,
        抚顺: 12,
        珲春: 22,
        绥芬河: 23,
        徐州: 101,
        南通: 100,
        温州: 134,
        绍兴: 102,
        芜湖: 52,
        福州: 190,
        泉州: 156,
        赣州: 80,
        济南: 161,
        烟台: 81,
        洛阳: 100,
        黄石: 24,
        岳阳: 48,
        汕头: 118,
        佛山: 164,
        泸州: 14,
        海东: 0,
        银川: 61
      };

      var colors = [
        ['#1DE9B6', '#F46E36', '#04B9FF', '#5DBD32', '#FFC809', '#FB95D5', '#BDA29A', '#6E7074', '#546570', '#C4CCD3'],
        [
          '#37A2DA',
          '#67E0E3',
          '#32C5E9',
          '#9FE6B8',
          '#FFDB5C',
          '#FF9F7F',
          '#FB7293',
          '#E062AE',
          '#E690D1',
          '#E7BCF3',
          '#9D96F5',
          '#8378EA',
          '#8378EA'
        ],
        ['#DD6B66', '#759AA0', '#E69D87', '#8DC1A9', '#EA7E53', '#EEDD78', '#73A373', '#73B9BC', '#7289AB', '#91CA8C', '#F49F42']
      ];
      var colorIndex = 0;
      var year = ['2019', '2020', '2021'];
      var mapData: any[] = [[], [], [], [], [], [], []];

      /*柱子Y名称*/
      var categoryData: any[] = [];
      var barData: any[] = [];

      for (var key in geoCoordMap) {
        mapData[0].push({
          year: '2013',
          name: key,
          value: d1[key]
        });
        mapData[1].push({
          year: '2014',
          name: key,
          value: d2[key]
        });
        mapData[2].push({
          year: '2015',
          name: key,
          value: d3[key]
        });
        mapData[3].push({
          year: '2016',
          name: key,
          value: d4[key]
        });
        mapData[4].push({
          year: '2017',
          name: key,
          value: d5[key]
        });
        mapData[5].push({
          year: '2018',
          name: key,
          value: d6[key]
        });
        mapData[6].push({
          year: '2019',
          name: key,
          value: d7[key]
        });
      }

      for (var i = 0; i < mapData.length; i++) {
        mapData[i].sort(function sortNumber(a: { value: number }, b: { value: number }) {
          return a.value - b.value;
        });
        barData.push([]);
        categoryData.push([]);
        for (var j = 0; j < mapData[i].length; j++) {
          barData[i].push(mapData[i][j].value);
          categoryData[i].push(mapData[i][j].name);
        }
      }

      var convertData = function (data: string | any[]) {
        var res = [];
        for (var i = 0; i < data.length; i++) {
          var geoCoord = geoCoordMap[data[i].name];
          if (geoCoord) {
            res.push({
              name: data[i].name,
              value: geoCoord.concat(data[i].value)
            });
          }
        }
        return res;
      };

      this.option3 = {
        timeline: {
          data: year,
          axisType: 'category',
          autoPlay: true,
          playInterval: 3000,
          left: '10%',
          right: '10%',
          bottom: '3%',
          width: '80%',
          label: {
            normal: {
              textStyle: {
                color: '#ddd'
              }
            },
            emphasis: {
              textStyle: {
                color: '#fff'
              }
            }
          },
          symbolSize: 10,
          lineStyle: {
            color: '#555'
          },
          checkpointStyle: {
            borderColor: '#777',
            borderWidth: 2
          },
          controlStyle: {
            showNextBtn: true,
            showPrevBtn: true,
            normal: {
              color: '#666',
              borderColor: '#666'
            },
            emphasis: {
              color: '#aaa',
              borderColor: '#aaa'
            }
          }
        },
        baseOption: {
          animation: true,
          animationDuration: 1000,
          animationEasing: 'cubicInOut',
          animationDurationUpdate: 1000,
          animationEasingUpdate: 'cubicInOut',
          grid: {
            right: '1%',
            top: '8%',
            bottom: '10%',
            width: '20%'
          },
          tooltip: {
            trigger: 'axis', // hover触发器
            axisPointer: {
              // 坐标轴指示器，坐标轴触发有效
              type: 'shadow', // 默认为直线，可选为：'line' | 'shadow'
              shadowStyle: {
                color: 'rgba(150,150,150,0.1)' //hover颜色
              }
            }
          },
          geo: {
            show: true,
            map: 'china',
            roam: true,
            zoom: 1,
            center: [113.83531246, 34.0267395887],
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
                // borderColor: 'rgba(192,245,249,.8)',
                // borderWidth: 3,
                // shadowColor: '#6FFDFF',
                // shadowOffsetY: 0,
                // shadowBlur: 10,
                // areaColor: {
                //   type: 'radial',
                //   x: 0.5,
                //   y: 0.5,
                //   r: 0.8,
                //   colorStops: [
                //     {
                //       offset: 0,
                //       color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                //     },
                //     {
                //       offset: 1,
                //       color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                //     }
                //   ],
                //   globalCoord: false // 缺省为 false
                // },
                // // shadowColor: 'rgba(255, 255, 255, 1)',
                // shadowOffsetX: -2
                borderColor: 'rgba(147, 235, 248, 1)',
                borderWidth: 1,
                areaColor: {
                  type: 'radial',
                  x: 0.5,
                  y: 0.5,
                  r: 0.5,
                  colorStops: [
                    {
                      offset: 0,
                      color: 'rgba(147, 235, 248, 0)' // 0% 处的颜色
                    },
                    {
                      offset: 1,
                      color: 'rgba(147, 235, 248, .2)' // 100% 处的颜色
                    }
                  ],
                  globalCoord: false // 缺省为 false
                }
                // shadowColor: 'rgba(128, 217, 248, 1)',
                // shadowColor: 'rgba(255, 255, 255, 1)',
                // shadowOffsetX: -2,
                // shadowOffsetY: 2,
                // shadowBlur: 10
              },
              emphasis: {
                areaColor: '#389BB7',
                borderWidth: 0
              }
            }
          }
        },
        options: []
      };

      for (var n = 0; n < year.length; n++) {
        this.option3.options.push({
          // backgroundColor: '#ffffff',
          title: [
            {
              id: 'statistic',
              text: `${year[n]}数值`,
              left: '80%',
              top: '1%',
              textStyle: {
                color: '#ffffff',
                fontSize: 25
              }
            }
          ],
          xAxis: {
            type: 'value',
            scale: true,
            position: 'top',
            min: 0,
            boundaryGap: false,
            splitLine: {
              show: false
            },
            axisLine: {
              show: false
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              margin: 2,
              textStyle: {
                color: '#aaa'
              }
            }
          },
          yAxis: {
            type: 'category',
            //  name: 'TOP 20',
            nameGap: 16,
            axisLine: {
              show: true,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisTick: {
              show: false,
              lineStyle: {
                color: '#ddd'
              }
            },
            axisLabel: {
              interval: 0,
              textStyle: {
                color: '#ffffff'
              }
            },
            data: categoryData[n]
          },

          series: [
            //地图
            {
              type: 'map',
              map: 'china',
              geoIndex: 0,
              aspectScale: 0.75, //长宽比
              showLegendSymbol: false, // 存在legend时显示
              label: {
                normal: {
                  show: false
                },
                emphasis: {
                  show: false,
                  textStyle: {
                    color: '#000000'
                  }
                }
              },
              roam: true,
              itemStyle: {
                normal: {
                  areaColor: '#031525',
                  borderColor: '#000000'
                },
                emphasis: {
                  areaColor: '#2B91B7'
                }
              },
              animation: false,
              data: mapData
            },
            //地图中闪烁的点
            {
              //  name: 'Top 5',
              type: 'effectScatter',
              coordinateSystem: 'geo',
              data: convertData(
                mapData[n]
                  .sort(function (a: { value: number }, b: { value: number }) {
                    return b.value - a.value;
                  })
                  .slice(0, 20)
              ),
              symbolSize: function (val: number[]) {
                return val[2] / 10;
              },
              showEffectOn: 'render',
              rippleEffect: {
                brushType: 'stroke'
              },
              hoverAnimation: true,
              label: {
                normal: {
                  formatter: '{b}',
                  position: 'right',
                  show: true
                }
              },
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n],
                  shadowBlur: 10,
                  shadowColor: colors[colorIndex][n]
                }
              },
              zlevel: 1
            },
            //柱状图
            {
              zlevel: 1.5,
              type: 'bar',
              symbol: 'none',
              itemStyle: {
                normal: {
                  color: colors[colorIndex][n]
                }
              },
              data: barData[n]
            }
          ]
        });
      }
    });

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
      itemGap: 10, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
      textStyle: {
        fontSize: 14,
        color: '#ffffff'
      }
    };
    const tooltip = {
      show: true,
      formatter: '{b}:{d}%'
    };
    const color4 = ['#03acd1', '#04cab7', '#03c781', '#fce348', '#fc2d8a', '#0292fe'];
    this.option4 = {
      color4,
      title,
      tooltip,
      legend,

      series: [
        {
          name: '工单类型分布',
          type: 'pie',
          center: ['10%', '50%'], //圆心的位置
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
    this.option5 = {
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
    this.option6 = {
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          // Use axis to trigger tooltip
          type: 'shadow' // 'shadow' as default; can also be 'line' or 'shadow'
        }
      },
      legend: {},
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
      },
      xAxis: {
        type: 'value'
      },
      yAxis: {
        type: 'category',
        data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
      },
      series: [
        {
          name: 'Direct',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [320, 302, 301, 334, 390, 330, 320]
        },
        {
          name: 'Mail Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [120, 132, 101, 134, 90, 230, 210]
        },
        {
          name: 'Affiliate Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [220, 182, 191, 234, 290, 330, 310]
        },
        {
          name: 'Video Ad',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [150, 212, 201, 154, 190, 330, 410]
        },
        {
          name: 'Search Engine',
          type: 'bar',
          stack: 'total',
          label: {
            show: true
          },
          emphasis: {
            focus: 'series'
          },
          data: [820, 832, 901, 934, 1290, 1330, 1320]
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

    this.option7 = {
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow', textStyle: { color: '#fff' } } },
      grid: { top: '5%', left: '2%', right: '2%', bottom: '2%', containLabel: true },
      xAxis: [
        {
          type: 'category',
          axisLine: { lineStyle: { color: '#0177d4' } },
          splitLine: { show: false },
          axisTick: { show: false },
          splitArea: { show: false },
          axisLabel: { interval: 0, color: '#fff', fontSize: 16 },
          data: ['0', '10', '0', '10']
        }
      ],
      yAxis: [
        {
          type: 'value',
          axisLine: { show: false, lineStyle: { color: '#144088' } },
          splitNumber: 3,
          axisTick: { show: false },
          axisLabel: { interval: 0, color: '#30ABE7', fontSize: 14 },
          splitArea: { show: false },
          splitLine: { show: true, lineStyle: { color: '#144088' } }
        },
        {
          name: '次数',
          nameTextStyle: { color: '#0195F2', fontSize: 14, position: 'right', padding: [10, 4, 0, -30] },
          axisLine: { show: false },
          axisTick: { show: false }
        }
      ],
      series: [
        {
          name: '次数',
          type: 'bar',
          barMaxWidth: 12,
          barGap: '10%',
          itemStyle: {
            normal: {
              color: {
                colorStops: [
                  { offset: 0, color: '#0173ff' },
                  { offset: 0.8, color: '#03fef1' }
                ],
                x: 0,
                y: 1,
                x2: 0,
                y2: 0,
                type: 'linear',
                global: false
              }
            }
          },
          label: {
            normal: {
              show: true,
              lineHeight: 30,
              width: 80,
              height: 30,
              color: '#1FFFF2',
              position: ['-12', '-30'],
              fontSize: 14
            }
          },
          data: [2500, 1200, 1800, 500]
        }
      ]
    };
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
      top: 2,
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
            fontSize: 12,
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
      top: 3,
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
            fontSize: 12,
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
      top: 3,
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
            fontSize: 12,
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
  //图表初始化实例
  onChartInit(event: any) {
    this.echartsIntance = event;
    // this.echartsIntance.showLoading(this.default);
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
      grid: {
        left: '3%',
        right: '4%',
        bottom: '3%'
      },
      color: color,
      title: [
        {
          text: '160',
          x: 'center',
          top: '42%',
          textStyle: {
            color: '#fff',
            fontSize: 30,
            fontWeight: '100'
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
        top: 2,
        itemWidth: 14, //小圆点宽度
        itemHeight: 14, // 小圆点高度
        itemGap: 2, // 图例每项之间的间隔。[ default: 10 ]横向布局时为水平间隔，纵向布局时为纵向间隔。
        textStyle: {
          fontSize: 14,
          color: '#ffffff'
        }
      },
      grid: {
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
          barCategoryGap: '1%',
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
  }
  interval$: any;
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

    this.webSite = visitData.slice(0, 10);
    this.salesData = salesData;
    this.offlineChartData = offlineChartData;
    this.cdr.detectChanges();
  }

  export(): void {
    console.log('temp');
  }
}
