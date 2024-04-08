import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { STColumn, STComponent } from '@delon/abc/st';
import { SFSchema } from '@delon/form';
import { ModalHelper, _HttpClient } from '@delon/theme';
import { format } from 'date-fns';
import { NzMessageService } from 'ng-zorro-antd/message';
import { RockiihubService } from 'src/app/services/rockiihub.service';

@Component({
  selector: 'app-device-devicelist-tags',
  templateUrl: './tags.component.html'
})
export class DeviceDevicelistTagsComponent implements OnInit {
  optionTrend = {};
  data: any[] = [];
  loading = false;
  selectedTagId = '';
  dDate: Date[] = [];
  echartsInstance: any;

  constructor(
    private router: Router,
    private http: _HttpClient,
    private modal: ModalHelper,
    private rhubservice: RockiihubService,
    private msgSrv: NzMessageService
  ) {}

  ngOnInit(): void {
    if (this.rhubservice.tags.length < 1) {
      this.router.navigate(['/device/devicelist']);
    }
    this.data = Object.values(this.rhubservice.tags);
  }
  onChartInit(event: any) {
    this.echartsInstance = event;
  }
  getData(): void {
    this.loading = true;
    var queryParam = {
      tagid: this.selectedTagId,
      dStart: format(this.dDate[0], 'yyyy-MM-dd HH:mm:ss'),
      dEnd: format(this.dDate[1], 'yyyy-MM-dd HH:mm:ss')
    };
    const selectedTag = this.data.find((tagid: any) => {
      return tagid.id === this.selectedTagId;
    });
    this.http.get('/influx/influxman/getDaqValue', queryParam).subscribe(res => {
      var charts = {
        unit: '',
        names: [selectedTag.name]
      };

      var color = ['rgba(23, 255, 243', 'rgba(255,100,97'];
      this.optionTrend = {
        backgroundColor: '',
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: charts.names,
          textStyle: {
            fontSize: 12,
            color: 'rgb(0,253,255,0.6)'
          },
          right: '4%'
        },
        grid: {
          top: '14%',
          left: '4%',
          right: '4%',
          bottom: '12%',
          containLabel: true
        },
        xAxis: {
          type: 'time',
          boundaryGap: false,
          axisLabel: {
            textStyle: {
              color: 'rgb(0,253,255,0.6)'
            }
          }
        },
        dataZoom: {
          show: true,
          realtime: true,
          start: 50,
          end: 100
        },
        toolbox: {
          show: true,
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            }
            //其他功能性按钮查看官网进行增加，包括（显示数据，下载图片，改为柱状图等）
          }
        },
        yAxis: {
          name: charts.unit,
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: 'rgb(0,253,255,0.6)'
            }
          },
          splitLine: {
            lineStyle: {
              color: 'rgb(23,255,243,0.3)'
            }
          },
          axisLine: {
            lineStyle: {
              color: 'rgb(0,253,255,0.6)'
            }
          }
        },
        series: [
          {
            name: selectedTag.name,
            type: 'line',
            showSymbol: false,
            hoverAnimation: false,
            data: res
          }
        ]
      };

      this.loading = false;
    });
  }

  selectedTagIdChange(event: any) {
    console.log(event);
  }

  onChange(result: Date): void {
    console.log('Selected Time: ', result);
  }

  onOk(result: Date | Date[] | null): void {
    console.log('onOk', result);
  }
}
