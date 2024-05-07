import { Injectable } from '@angular/core';
import { Client, Message } from '@stomp/stompjs';

@Injectable({
  providedIn: 'root'
})
export class MonitorWebSocketService {
  private stompClient: Client;

  constructor() {
    this.stompClient = new Client({
      brokerURL: 'ws://localhost:8080/ws/messages',
      reconnectDelay: 5000,
      debug: (str: string) => {
        console.log(str);
      }
    });
    this.stompClient.activate();
  }

  // Method to subscribe to WebSocket messages
  getMessage(callback: (message: Message) => void) {
    this.stompClient.onConnect = () => {
      this.stompClient.subscribe('/ws/messages', callback);
    };
    this.stompClient.onStompError = (frame) => {
      console.error('Error connecting to WebSocket:', frame);
      alert('Error connecting to WebSocket. Please check your connection.');
    };
  }
}
