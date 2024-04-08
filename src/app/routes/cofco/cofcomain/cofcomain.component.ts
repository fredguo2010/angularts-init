import { NONE_TYPE } from '@angular/compiler';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AutoCompleteWidget } from '@delon/form';
import { _HttpClient } from '@delon/theme';
import { format } from 'date-fns';
import * as echarts from 'echarts';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-cofco-cofcomain',
  templateUrl: './cofcomain.component.html',
  styleUrls: ['./cofcomain.component.scss']
})
export class CofcoCofcomainComponent implements OnInit, OnDestroy {
  gridStyle = {
    width: '33.3%',
    textAlign: 'center',
    margin: 'auto'
  };
  cdate: string = '';
  intervalMain$: any;
  interval$: any;
  interval1$: any;
  arrayMemo: any = [{}];
  prodsummaryarray: any = [{}];
  option1: any = {};
  option3: any = {};
  echartsInstance: any;
  echartsInstance1: any;

  eoptionLoad: any = {};
  eoptionLoadTrend: any = {};
  eoptionLoadAnly: any = {};
  eoptionLoadTop5: any = {};
  eoptionProdTop5: any = {};
  eoptionProdAnly: any = {};
  eoptionProdLoadTrend: any = {};
  constructor(private msgSrv: NzMessageService, private http: _HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.interval$ = setInterval(() => {
      const newdate = new Date();
      this.cdate = format(newdate, 'yyyy-MM-dd HH:mm:ss');
    }, 6000);

    this.intervalMain$ = setInterval(() => {
      this.getProdSummary();
      this.getProdLoadAnlyProduct();
      this.getProdTop5();
      this.getLoadTop5();
    }, 60000);

    this.getProdSummary();
    this.getProdLoadAnlyProduct();
    this.getProdTop5();
    this.getLoadTop5();
  }

  ngOnDestroy() {
    if (this.interval$) {
      clearInterval(this.interval$);
    }
    if (this.interval1$) {
      clearInterval(this.interval1$);
    }
    if (this.intervalMain$) {
      clearInterval(this.intervalMain$);
    }
  }

  afterChange(inum: number): void {
    if (this.prodsummaryarray.length == inum) {
      this.updateLoad(this.prodsummaryarray[0].iLoad);
    } else {
      this.updateLoad(this.prodsummaryarray[inum].iLoad);
    }
  }

  getProdSummary(): void {
    // this.loading = true;
    this.http
      .get('/cofco/prodsummary/getallbydate?_allow_anonymous=true', {
        dDate: format(new Date(), 'yyyy-MM-dd')
      })
      .subscribe(res => {
        this.prodsummaryarray = res;
        if (this.prodsummaryarray.length > 0) {
          this.arrayMemo = res.filter((item: { cMemo: string }) => item.cMemo != '');
          this.updateLoad(this.prodsummaryarray[0].iLoad);
          this.updateLoadTrend(res);
          this.updateMap(res);
          this.updateProdLoadTrend(res);
        }
      });
  }

  getProdTop5(): void {
    // this.loading = true;
    this.http
      .get('/cofco/prodsummary/gettop5Prodbydate?_allow_anonymous=true', {
        dDate: format(new Date(), 'yyyy-MM-dd')
      })
      .subscribe(res => {
        this.updateProdTop5(res);
      });
  }

  getLoadTop5(): void {
    // this.loading = true;
    this.http
      .get('/cofco/prodsummary/gettop5Loadbydate?_allow_anonymous=true', {
        dDate: format(new Date(), 'yyyy-MM-dd')
      })
      .subscribe(res => {
        this.updateLoadTop5(res);
      });
  }

  getProdLoadAnlyProduct(): void {
    // this.loading = true;
    this.http
      .get('/cofco/prodsummary/getProdLoadAnlyProductbydate?_allow_anonymous=true', {
        dDate: format(new Date(), 'yyyy-MM-dd')
      })
      .subscribe(res => {
        this.updateLoadAnly(res);
        this.updateProdAnly(res);
      });
  }

  geoNameIndex = 0;
  citys = [
    '绥化公司',
    '安徽生化',
    '安徽公司',
    '广西公司',
    '肇东公司',
    '辽宁公司',
    '吉林公司',
    '广东公司',
    '江苏公司',
    '衡水公司',
    '成都公司',
    '马鞍山',
    '武汉公司'
  ];
  onChartInit(event: any) {
    this.echartsInstance = event;
    this.echartsInstance.on('click', (params: any) => {
      const scity = this.citys.find((ccity: string) => {
        return ccity === params.name;
      });
      if (scity != undefined) {
        window.open(`#/cofco/cofcosite?cname=${params.name}`);
      }
    });
    // this.echartsIntance.showLoading(this.default);
    this.interval1$ = setInterval(() => {
      if (this.geoNameIndex > 11) {
        this.geoNameIndex = 0;
      } else {
        this.geoNameIndex++;
      }
      this.echartsInstance.dispatchAction({
        type: 'showTip', //默认显示江苏的提示框
        seriesIndex: 1, //这行不能省
        name: this.citys[this.geoNameIndex]
      });
    }, 3000);
  }

  updateLoad(iload: number): void {
    let angle = 0; //角度，用来做简单的动画效果的
    let value = iload; //图上角度数据
    this.eoptionLoad = {
      title: {
        text: `{a|负荷\n${value}%}{c|}`,
        x: 'center',
        y: 'center',
        textStyle: {
          rich: {
            a: {
              fontSize: 16,
              color: '#ffffff',
              fontWeight: 'bold'
            },
            c: {
              fontSize: 16,
              color: '#ffffff',
              fontWeight: 'normal'
            }
          }
        }
      },
      series: [
        //内环
        {
          name: '',
          type: 'custom',
          coordinateSystem: 'none',
          renderItem: function (_params: any, api: { getWidth: () => number; getHeight: () => number }) {
            return {
              type: 'arc',
              shape: {
                cx: api.getWidth() / 2,
                cy: api.getHeight() / 2,
                r: (Math.min(api.getWidth(), api.getHeight()) / 2.3) * 0.65,
                startAngle: ((0 + -angle) * Math.PI) / 180,
                endAngle: ((360 + -angle) * Math.PI) / 180
              },
              style: {
                stroke: '#0CD3DB',
                fill: 'transparent',
                lineWidth: 0.5
              },
              silent: true
            };
          },
          data: [0]
        },
        //外环
        {
          name: '',
          type: 'pie',
          radius: ['85%', '70%'],
          silent: true,
          clockwise: true,
          startAngle: 90,
          z: 0,
          zlevel: 0,
          label: {
            normal: {
              position: 'center'
            }
          },
          data: [
            {
              value: value,
              name: '',
              itemStyle: {
                normal: {
                  //外环发光
                  borderWidth: 0.5,
                  shadowBlur: 10,
                  borderColor: '#4bf3f9',
                  shadowColor: '#9bfeff',
                  color: {
                    // 圆环的颜色
                    colorStops: [
                      {
                        offset: 0,
                        color: '#4bf3f9' // 0% 处的颜色
                      },
                      {
                        offset: 1,
                        color: '#4bf3f9' // 100% 处的颜色
                      }
                    ]
                  }
                }
              }
            },
            {
              value: 100 - value,
              name: '',
              label: {
                normal: {
                  show: false
                }
              },
              itemStyle: {
                normal: {
                  color: '#173164'
                }
              }
            }
          ]
        }
      ]
    };
  }

  updateProdAnly(prodSum: any): void {
    var data1 = prodSum.map((item: { _sum: any; _id: any }) => {
      return { value: item._sum.iProd, name: item._id };
    });

    this.eoptionProdAnly = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: '5%',
        bottom: '5%',
        right: '5%',
        textStyle: {
          fontSize: 8,
          color: '#fff'
        }
        // formatter: function (name: string, value: number) {
        //   //const item = data1.filter((item: { name: string }) => item.name === name)[0];
        //   return `${name}：${value}吨`;
        // }
      },
      series: [
        {
          type: 'pie',
          center: ['30%', '50%'],
          radius: ['60%', '80%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },

          emphasis: {
            label: {
              show: true,
              position: 'outside',
              fontSize: '12',
              color: '#fff',
              formatter: function (params: { value: number; name: string }) {
                var total = 0;
                for (var i = 0; i < data1.length; i++) {
                  total += data1[i].value;
                }
                var percentstr = ((params.value / total) * 100).toFixed(0);
                if (params.name !== '') {
                  return `${params.name}\n${params.value}吨` + `\n` + `占百分比：${percentstr}%`;
                } else {
                  return '';
                }
              }
            }
          },
          labelLine: {
            show: false
          },
          data: data1
        }
      ]
    };
  }

  updateLoadAnly(loadSum: any): void {
    var data1 = loadSum.map((item: { _avg: any; cProduct: any }) => {
      return { value: item._avg.iLoad, name: item.cProduct };
    });
    this.eoptionLoadAnly = {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c} ({d}%)'
      },
      legend: {
        orient: 'vertical',
        left: '5%',
        bottom: '5%',
        right: '5%',
        textStyle: {
          fontSize: 8,
          color: '#fff'
        }
        // formatter: function (name: string, value: number) {
        //   //const item = data1.filter((item: { name: string }) => item.name === name)[0];
        //   return `${name}：${value}吨`;
        // }
      },
      series: [
        {
          type: 'pie',
          center: ['30%', '50%'],
          radius: ['60%', '80%'],
          avoidLabelOverlap: false,
          label: {
            show: false,
            position: 'center'
          },

          emphasis: {
            label: {
              show: true,
              position: 'outside',
              fontSize: '12',
              color: '#fff',
              formatter: function (params: { value: number; name: string }) {
                var total = 0;
                for (var i = 0; i < data1.length; i++) {
                  total += data1[i].value;
                }
                var percentstr = ((params.value / total) * 100).toFixed(0);
                if (params.name !== '') {
                  return `${params.name}\n${params.value}` + `\n` + `占百分比：${percentstr}%`;
                } else {
                  return '';
                }
              }
            }
          },
          labelLine: {
            show: false
          },
          data: data1
        }
      ]
    };
  }

  updateProdTop5(prodTop5: any) {
    var ydata = prodTop5.map((item: any) => {
      return item.cOrgName + item.cAssetName;
    });
    var vdata1 = prodTop5.map((item: any) => {
      return item.iProd;
    });
    this.eoptionProdTop5 = {
      // title: {
      //   textStyle: {
      //     color: '#fff'
      //   },
      //   top: 60,
      //   left: 70
      // },
      color: '#2bbfb2',
      // legend: {
      //     data: xdata,
      //     textStyle: {
      //         color: fontColor
      //     },
      //     bottom: '45%'
      // },
      tooltip: {
        trigger: 'axis',
        backgroundColor: '#202630',
        borderColor: '#202630',
        axisPointer: {
          type: 'line',
          lineStyle: {
            type: 'solid'
          }
        },

        textStyle: {
          color: '#fff'
        },
        formatter: function (
          params: Array<{
            marker: any;
            name: any;
            value: any;
          }>
        ) {
          return `${params[0].name}<br/>${params[0].marker}${params[0].value}`;
        }
      },
      xAxis: {
        type: 'value',
        max: 1500,
        axisLabel: {
          color: '#869bba',
          fontSize: 10
        },
        splitLine: {
          show: false
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#679cbf'
          }
        }
      },
      yAxis: {
        data: ydata,
        axisLabel: {
          color: '#fff',
          fontSize: 10
        },
        axisLine: {
          show: true,
          lineStyle: {
            color: '#ccc'
          }
        },
        boundaryGap: true,
        minInterval: 30
      },
      grid: [
        {
          bottom: '15%',
          top: '17%',
          left: '30%',
          right: '2%'
        }
      ],
      series: [
        {
          name: '制度数量统计',
          type: 'bar',
          barWidth: '40%',
          data: vdata1,
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#FFBD81' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#EF9545' // 100% 处的颜色
                  }
                ],
                false
              )
              // shadowColor:  "rgba(0,160,221,1)",
              // shadowBlur: 4
            }
          }
        }
      ]
    };
  }

  updateLoadTop5(loadTop5: any) {
    let datas = loadTop5.map((item: any) => {
      return { unitname: item.cOrgName + item.cAssetName, nums: item.iLoad };
    });

    this.eoptionLoadTop5 = {
      // title: {
      //   text: '负荷',
      //   left: '50%',
      //   top: '-1%',
      //   textStyle: {
      //     color: '#fff'
      //     //  type: 'dashed',
      //   }
      // },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'shadow'
        }
      },
      grid: {
        top: '20%',
        right: '3%',
        left: '20%',
        bottom: '35%',
        height: '65%'
      },
      xAxis: [
        {
          type: 'category',
          data: datas.map((e: { unitname: any }) => e.unitname),
          axisLine: {
            lineStyle: {
              color: '#3A67A1'
              //  type: 'dashed',
            }
          },
          axisLabel: {
            show: true,
            color: '#fff',
            fontSize: 12,
            formatter: function (val: string) {
              var strs = val.split(''); //字符串数组
              var str = '';
              for (var i = 0, s; (s = strs[i++]); ) {
                //遍历字符串数组
                str += s;
                if (!(i % 4)) str += '\n'; //按需要求余
              }
              return str;
            }
          },
          axisTick: {
            show: false
          }
        }
      ],
      yAxis: [
        {
          type: 'value',
          // name: "单位：人",
          nameTextStyle: {
            color: '#fff',
            fontSize: 14
          },
          axisLabel: {
            formatter: '{value}',
            color: '#fff'
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              // type: 'dashed',
              width: 1,
              color: '#203C6D'
            }
          },
          axisLine: {
            show: true,
            lineStyle: {
              color: '#3A67A1' // "rgba(0,186,255,.6)"
            }
          }
        }
      ],
      series: [
        {
          type: 'bar',
          data: datas.map((e: { nums: any }) => e.nums),
          barWidth: '12px',
          itemStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#FFBD81' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: '#EF9545' // 100% 处的颜色
                  }
                ],
                false
              )
              // shadowColor:  "rgba(0,160,221,1)",
              // shadowBlur: 4
            }
          },
          label: {
            normal: {
              color: '#fff',
              show: true,
              formatter: '{c}',
              position: 'top'
            }
          }
        }
      ]
    };
  }

  updateLoadTrend(loadSum: any) {
    var databar = loadSum.map(() => {
      return 150;
    });
    let xLabel = loadSum.map((item: { cOrgName: any; cAssetName: any }) => {
      return item.cOrgName + item.cAssetName;
    });
    let xData = loadSum.map((item: any) => {
      return item.iLoad;
    });
    this.eoptionLoadTrend = {
      tooltip: {
        trigger: 'axis'
      },
      grid: {
        top: '20%',
        left: '15%',
        right: '1%',
        bottom: '10%'
        // containLabel: true
      },
      xAxis: [
        {
          type: 'category',
          show: false,
          boundaryGap: false,
          axisLine: {
            //坐标轴轴线相关设置。数学上的x轴
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgb(37,71,55)'
            }
          },
          axisTick: {
            show: false
          },
          data: xLabel
        }
      ],
      yAxis: [
        {
          name: '%',
          triggerEvent: true,
          nameTextStyle: {
            color: 'rgb(98,127,115)',
            fontSize: 12,
            padding: [0, 0, 0, -50]
          },
          min: 0,
          max: 150,
          interval: 30,
          splitLine: {
            show: false,
            lineStyle: {
              color: '#192a44'
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: 'rgb(77,83,141)',
              width: 4
            }
          },
          axisLabel: {
            show: true,
            textStyle: {
              color: 'rgb(98,127,115)',
              verticalAlign: 'top', //看这里
              align: 'left', //看这里
              //调整文字上右下左
              padding: [0, 0, 0, -30] //看这里
            }
          },
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '柱图',
          type: 'bar',
          barWidth: '60%',
          data: databar,
          itemStyle: {
            normal: {
              color: 'rgba(35,69,55,.5)'
            }
          },
          tooltip: {
            show: false
          },
          legend: {
            show: false
          }
        },
        {
          name: '2021',
          type: 'line',
          smooth: false,
          symbol: 'circle',
          symbolSize: 5,
          showSymbol: false,
          lineStyle: {
            normal: {
              width: 1
            }
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: 'rgba(255,188,10, 0.3)'
                  },
                  {
                    offset: 0.8,
                    color: 'rgba(255,188,10, 0.3)'
                  }
                ],
                false
              ),
              shadowColor: 'rgba(0, 0, 0, 0.1)',
              shadowBlur: 10
            }
          },
          itemStyle: {
            normal: {
              color: 'rgb(255,188,10)',
              borderColor: 'rgba(255,188,10,0.27)',
              borderWidth: 12
            }
          },
          data: xData
        }
      ]
    };
  }

  updateProdLoadTrend(loadSum: any) {
    const prodArry = loadSum.map((item: any) => {
      return item.iProd;
    });
    const loadArry = loadSum.map((item: any) => {
      return item.iLoad;
    });

    const xArray = loadSum.map((item: any) => {
      return item.cOrgName + item.cAssetName;
    });
    this.eoptionProdLoadTrend = {
      // backgroundColor: 'rgba(30, 34, 48, 1)',
      legend: {
        top: 17,
        right: 30,
        icon: 'roundRect',
        itemWidth: 10,
        itemHeight: 8,
        itemGap: 15,
        textStyle: {
          fontFamily: 'MicrosoftYaHei',
          fontSize: 12,
          color: 'rgba(255, 255, 255, 1)'
        },
        data: ['产量', '负荷']
      },
      grid: {
        top: '10%',
        left: '5%',
        right: '5%',
        bottom: '10%',
        containLabel: true
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'line',
          lineStyle: {
            color: '#DF4C09'
          }
        },
        backgroundColor: 'rgba(42, 51, 74, 1)',
        borderColor: 'transparent',
        formatter: function (params: string | any[]) {
          let colors = ['#DF4C09', '#BF900B'];
          let returnData = '<div style="padding: 5px 10px;">';
          returnData += `<span style="font-family: MicrosoftYaHei; font-size: 14px; color: rgba(210, 221, 249, 1);">${params[0].axisValue}</span><br/>`;
          for (let i = 0; i < params.length; i++) {
            returnData += `<span style="display:inline-block; width:10px; height:8px; margin-right:5px; border-radius:1px; background-color:${colors[i]}"></span>`;
            returnData += `<span style="font-family: MicrosoftYaHei; font-size: 14px; color: ${colors[i]}">${
              params[i].seriesName
            }：</span><span style="font-family: Verdana; font-size: 14px; color: ${colors[i]}">${params[i].value}</span>
            <span style="display:inline-block; margin-left: 4px; line-height: 10px; font-family: MicrosoftYaHei; font-size: 12px; color: ${
              colors[i]
            }">${params[i].seriesName == `产量` ? `吨` : `%`}</span><br/>`;
          }
          returnData += '</div>';
          return returnData;
        }
      },
      xAxis: {
        type: 'category',
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(52, 51, 51, 1)'
          }
        },
        splitLine: {
          show: false
        },
        axisLabel: {
          fontFamily: 'MicrosoftYaHei',
          fontSize: 12,
          color: 'rgba(113, 113, 113, 1)'
        },
        axisTick: {
          show: false,
          alignWithLabel: true
        },
        boundaryGap: false,
        data: xArray
      },
      yAxis: [
        {
          type: 'value',
          name: '吨',
          nameTextStyle: {
            fontFamily: 'MicrosoftYaHei',
            fontSize: 12,
            color: 'rgba(113, 113, 113, 1)'
          },
          min: 0,
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(52, 51, 51, 0.8)'
            }
          },
          axisLabel: {
            show: true,
            margin: 20,
            textStyle: {
              fontFamily: 'MicrosoftYaHei',
              fontSize: 12,
              color: 'rgba(113, 113, 113, 1)'
            }
          },
          axisTick: {
            show: false
          }
        },
        {
          type: 'value',
          name: '%',
          nameTextStyle: {
            fontFamily: 'MicrosoftYaHei',
            fontSize: 12,
            color: 'rgba(113, 113, 113, 1)'
          },
          min: 0,
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(52, 51, 51, 0.8)'
            }
          },
          axisLabel: {
            show: true,
            margin: 20,
            textStyle: {
              fontFamily: 'MicrosoftYaHei',
              fontSize: 12,
              color: 'rgba(113, 113, 113, 1)'
            }
          },
          axisTick: {
            show: false
          }
        }
      ],
      series: [
        {
          name: '产量',
          type: 'line',
          symbol: 'circle',
          symbolSize: 1,
          lineStyle: {
            color: '#DF4C09',
            width: 1
          },
          label: {
            show: false
          },
          itemStyle: {
            normal: {
              color: '#DF4C09'
            },
            color: '#DF4C09',
            borderColor: 'rgba(155, 155, 226, 0.8)',
            borderWidth: 1
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#2D1002'
                  },
                  {
                    offset: 1,
                    color: 'transparent'
                  }
                ],
                false
              ),
              shadowColor: '#2D1002',
              shadowBlur: 20
            }
          },
          data: prodArry
        },
        {
          name: '负荷',
          type: 'line',
          symbol: 'circle',
          symbolSize: 1,
          lineStyle: {
            color: '#BF900B',
            width: 1
          },
          label: {
            show: false
          },
          itemStyle: {
            color: '#BF900B',
            borderColor: '#BF900B',
            borderWidth: 1
          },
          areaStyle: {
            normal: {
              color: new echarts.graphic.LinearGradient(
                0,
                0,
                0,
                1,
                [
                  {
                    offset: 0,
                    color: '#4B2D0D'
                  },
                  {
                    offset: 1,
                    color: 'transparent'
                  }
                ],
                false
              ),
              shadowColor: '#4B2D0D',
              shadowBlur: 20
            }
          },
          data: loadArry,
          yAxisIndex: 1
        }
      ]
    };
  }

  updateMap(prodarray: any): void {
    this.http.get('../assets/geodata.json?_allow_anonymous=true').subscribe(geoJson => {
      echarts.registerMap('china', geoJson);

      var geoCoordMap: Record<string, number[]> = {
        绥化公司: [127, 46.63],
        成都公司: [103.9526, 30.7617],
        安徽生化: [116.27, 33.86],
        安徽公司: [117.27, 31.86],
        广西公司: [108.33, 22.84],
        肇东公司: [128, 47.63],
        辽宁公司: [123.38, 41.8],
        吉林公司: [126.55302, 43.843577],
        广东公司: [113.23, 23.16],
        江苏公司: [118.78, 32.04],
        衡水公司: [115.72, 37.72],
        马鞍山: [118.507906, 31.689362],
        武汉公司: [114.298572, 30.584355]
        // 杭州: [119.5313, 29.8773],
        // 苏州: [118.8062, 31.9208],
        // 上海: [121.4648, 31.2891],
        // 天津: [117.4219, 39.4189],
        // 深圳: [114.072026, 22.552194],
        // 郑州: [113.4668, 34.6234],
        // 宁波: [121.640618, 29.86206],
        // 合肥: [117.29, 32.0581],
        // 蚌埠: [117.363228, 32.939667],
        // 重庆: [108.384366, 30.439702],
        // 广州: [113.12244, 23.009505],
        // 大连: [123.1238, 42.1216],
        // 青岛: [117.1582, 36.8701],
        // 北京: [116.4551, 40.2539],
        // 义乌: [120.067209, 29.346921],
        // 东莞: [113.764742, 23.02039],
        // 长沙: [113.0823, 28.2568],
        // 贵阳: [106.6992, 26.7682],
        // 珠海: [113.556111, 22.250876],
        // 威海: [122.109148, 37.516889],
        // 泉州: [118.58, 24.93],
        // 赤峰: [118.87, 42.28],
        // 厦门: [118.1, 24.46],
        // 福州: [119.3, 26.08],
        // 抚顺: [123.97, 41.97],
        // 汕头: [116.69, 23.39],
        // 海口: [110.35, 20.02],
        // 岳阳: [113.09, 29.37],
        // 武汉: [114.31, 30.52],
        // 唐山: [118.02, 39.63],
        // 石家庄: [114.48, 38.03],
        // 哈尔滨: [126.63, 45.75],
        // 兰州: [103.73, 36.03],
        // 呼和浩特: [111.65, 40.82],
        // 南昌: [115.89, 28.68],
        // 佛山: [113.11, 23.05],
        // 烟台: [121.39, 37.52]
      };

      // //2019年数据
      // var d1: any = {
      //   绥化公司: 80.33,
      //   安徽公司: 79.25,
      //   广西公司: 72.5,
      //   肇东公司: 100.08,
      //   辽宁公司: 80,
      //   吉林公司: 70,
      //   广东公司: 85,
      //   江苏公司: 87,
      //   衡水公司: 81,
      //   成都公司: 81,
      //   马鞍山: 73,
      //   武汉公司: 69
      // };

      // //2020年数据
      // var d2: any = {
      //   绥化公司: 80.33,
      //   安徽公司: 79.25,
      //   广西公司: 72.5,
      //   肇东公司: 100.08,
      //   辽宁公司: 80,
      //   吉林公司: 70,
      //   广东公司: 85,
      //   江苏公司: 87,
      //   衡水公司: 81,
      //   成都公司: 81,
      //   马鞍山: 73,
      //   武汉公司: 69
      // };

      // //2020年数据
      // var d3: any = {
      //   绥化公司: 80.33,
      //   安徽公司: 79.25,
      //   广西公司: 72.5,
      //   肇东公司: 100.08,
      //   辽宁公司: 80,
      //   吉林公司: 70,
      //   广东公司: 85,
      //   江苏公司: 87,
      //   衡水公司: 81,
      //   成都公司: 81,
      //   马鞍山: 73,
      //   武汉公司: 69
      // };
      // var d1keyvalue = prodsummaryarray.map((item: any) => {
      //   return { name: item.cOrgName, value: item.iProd };
      // });
      // console.log(d1keyvalue);
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
      var mapDates = [format(new Date(), 'yyyy-MM-dd')];
      var mapData: any[] = [[], [], [], [], [], [], []];

      /*柱子Y名称*/
      var categoryData: any[] = [];
      var barData: any[] = [];

      // d1keyvalue.map((item: { key: any; value: any }) => {
      //   mapData[0].push({
      //     year: format(new Date(), 'yyyy-MM-dd'),
      //     name: item.key,
      //     value: item.value
      //   });
      // });
      // var cobj = prodarray.find((obj: any) => {
      //   return obj.cOrgName === '绥化公司';
      // });
      // console.log(cobj);
      for (var key in geoCoordMap) {
        var cobj = prodarray.find((obj: any) => {
          return obj.cOrgName === key;
        });
        mapData[0].push({
          year: format(new Date(), 'yyyy-MM-dd'),
          name: key,
          value: cobj == undefined ? 0 : cobj.iProd
        });
        // mapData[1].push({
        //   year: format(new Date(), 'yyyy-MM-dd'),
        //   name: key,
        //   value: d2[key]
        // });
        // mapData[2].push({
        //   year: format(new Date(), 'yyyy-MM-dd'),
        //   name: key,
        //   value: d3[key]
        // });
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
          data: mapDates,
          axisType: 'category',
          autoPlay: true,
          playInterval: 30000,
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
            formatter: (params: any, callback: any) => {
              if (params.seriesIndex == 0) {
                //当鼠标放在城市圈上不显示提示信息
                return '';
              }

              //这里的四个数据 需要从后台获取 此处写ajax就好
              const curProdsummary = this.prodsummaryarray.find((obj: any) => {
                return obj.cOrgName === params.name;
              });
              let res =
                `<div class='maptipbg'>` +
                `<div class='maptiptitlebar'>` +
                `<div>` +
                `<span class="text_tipTitle">${params.name}</span>` +
                `</div>` +
                `<div>` +
                `<span class="text_tip">产量：NA</span>` +
                `</div>` +
                `<div>` +
                `<span class="text_tip">负荷：NA%</span>` +
                `</div>` +
                `</div>` +
                `</div>`;

              if (curProdsummary != undefined) {
                res =
                  `<div class='maptipbg'>` +
                  `<div class='maptiptitlebar'>` +
                  `<div>` +
                  `<span class="text_tipTitle">${params.name}</span>` +
                  `</div>` +
                  `<div>` +
                  `<span class="text_tip">产量：${curProdsummary.iProd}吨</span>` +
                  `</div>` +
                  `<div>` +
                  `<span class="text_tip">负荷：${curProdsummary.iLoad}%</span>` +
                  `</div>` +
                  `</div>` +
                  `</div>`;
              }

              return res;
            },
            padding: 0,
            borderWidth: 0
          },
          geo: {
            show: true,
            map: 'china',
            left: '10%',
            right: '20%',
            roam: true,
            zoom: 1,
            center: [108.948024, 34.263161],
            label: {
              emphasis: {
                show: false
              }
            },
            itemStyle: {
              normal: {
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

      for (var n = 0; n < mapDates.length; n++) {
        this.option3.options.push({
          // backgroundColor: '#ffffff',
          title: [
            {
              id: 'statistic',
              text: `当日产量及负荷`,
              left: '80%',
              top: '1%',
              textStyle: {
                color: '#ffffff',
                fontSize: 14
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
              aspectScale: 1, //长宽比
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
                return val[2] / 100;
                // return 10;
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
              label: {
                show: true,
                position: 'insideBottom',
                // distance: 19,
                align: 'middle',
                verticalAlign: 'middle',
                // rotate: 90,
                formatter: '{c}吨',
                fontSize: 16,
                textStyle: {
                  color: '#ffffff'
                }
              },
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
  }

  close(): void {}
}
