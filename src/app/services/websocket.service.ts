import { Injectable } from '@angular/core';
import { environment } from '@env/environment';
import { Observable } from 'rxjs';
import { io } from 'socket.io-client';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  private url!: string | URL; // 默认请求的url
  private webSocket!: WebSocket; // websocket对象
  connectSuccess = false; // websocket 连接成功
  period = 60 * 1000 * 10; // 10分钟检查一次
  //serverTimeoutSubscription!: Subscription; // 定时检测连接对象
  reconnectFlag = false; // 重连
  reconnectPeriod = 5 * 1000; // 重连失败,则5秒钟重连一次
  //reconnectSubscription!: Subscription; // 重连订阅对象
  //runTimeSubscription!: Subscription; // 记录运行连接subscription
  runTimePeriod = 60 * 10000; // 记录运行连接时间

  constructor() {
    this.url = environment.socketurl;
    console.log('开始心跳检测');
    // 进入程序就进行心跳检测,避免出现开始就连接中断,后续不重连
  }

  private socket: any;

  sendMessage(message: any) {
    this.socket.emit('add-message', message);
  }

  getMessages(): Observable<any> {
    return new Observable(observer => {
      this.socket = io(this.url, { withCredentials: true });
      this.socket.on('message', (data: any) => {
        observer.next(data);
      });
      return () => {
        this.socket.disconnect();
      };
    });
  }
}
