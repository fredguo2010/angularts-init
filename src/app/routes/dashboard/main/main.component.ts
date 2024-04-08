import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Chart } from '@antv/g2';
import { Random } from 'mockjs';
import { NzSafeAny } from 'ng-zorro-antd/core/types';
import { NzMessageService } from 'ng-zorro-antd/message';
import { WebsocketService } from 'src/app/services/websocket.service';

@Component({
  selector: 'app-dashboard-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.less']
})
export class DashboardMainComponent implements OnInit, OnDestroy {
  messages = [];
  connection: any;
  message: any;
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

  constructor(
    private msg: NzMessageService,
    private ngZone: NgZone,
    private cdr: ChangeDetectorRef,
    private webSocketService: WebsocketService
  ) {}

  ngOnInit(): void {
    // 连接websocket 接收消息
    this.connection = this.webSocketService.getMessages().subscribe((data: any) => {
      if (data.ctype == 'irst') {
        this.stat.item3 = data.data;
      }
    });
  }

  sendms() {
    this.webSocketService.sendMessage(Math.random().toString());
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
      height: 300
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

  ngOnDestroy(): void {
    this.connection.unsubscribe(); // 组件销毁取消订阅
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
