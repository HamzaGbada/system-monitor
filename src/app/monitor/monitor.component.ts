import { Component, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { MonitorWebSocketService } from '../monitor-web-socket.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent{
  name= "aaa";

  constructor(private monitorWebSocketService: MonitorWebSocketService) { }

  connect(): void {
    this.monitorWebSocketService.connect();
  }

  disconnect(): void {
    this.monitorWebSocketService.disconnect();
  }

  sendName(): void {
    this.monitorWebSocketService.sendName(this.name);
  }

}
