import { Component, OnInit } from '@angular/core';
import { Message } from '@stomp/stompjs';
import { MonitorWebSocketService } from '../monitor-web-socket.service';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit {
  textMessage: string = '';
  privateMessage: string = '';
  recipient: string = '';
  messages: string[] = [];
  constructor(private monitorWebSocketService: MonitorWebSocketService) { }

  ngOnInit(): void {
    this.monitorWebSocketService.getMessageSubject().subscribe(message => {
      this.messages.push(message);
    });
  }

  sendMessage() {
    if (this.textMessage.trim()) {
      this.monitorWebSocketService.sendMessage(this.textMessage);
      this.textMessage = '';
    }
  }

  sendPrivateMessage() {
    if (this.privateMessage.trim() && this.recipient.trim()) {
      // You need to implement the logic for sending a private message
      console.log('Sending private message to: ' + this.recipient);
      this.privateMessage = '';
      this.recipient = '';
    }
  }
}
