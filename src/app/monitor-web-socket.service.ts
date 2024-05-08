import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Client, Stomp} from "@stomp/stompjs";


@Injectable({
  providedIn: 'root'
})
export class MonitorWebSocketService {
  // @ts-ignore
  private stompClient: Stomp.Client;

  private messageSubject = new BehaviorSubject<string>('');

  constructor() {
    this.stompClient  = new Client({
      brokerURL: "ws://localhost:8090/ws"
    })
  }

  connect(): void {
    this.stompClient.connect({}, frame => {
      console.log('Connected: ' + frame);
      this.stompClient.subscribe('/all/messages', greeting => {
        console.log(JSON.parse(greeting.body).content);
      });
    }, error => {
      console.error('Error with websocket', error);
    });
  }

  disconnect(): void {
    if (this.stompClient) {
      this.stompClient.disconnect(() => {
        console.log('Disconnected');
      });
    }
  }

  sendName(name: string): void {
    this.stompClient.send('/app/hello', {}, JSON.stringify({ 'name': name }));
  }
}
