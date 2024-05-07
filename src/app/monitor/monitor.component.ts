import { Component, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { MonitorWebSocketService } from '../monitor-web-socket.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  messages: any[] = [];

  constructor(private monitorWebSocketService: MonitorWebSocketService) { }

  ngOnInit(): void {
    // Subscribe to WebSocket messages
    this.monitorWebSocketService.getMessage((message: Message) => {
      this.messages.push(JSON.parse(message.body));
    });
  }
}
