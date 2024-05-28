import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Client} from "@stomp/stompjs";
import * as Stomp from 'stompjs';


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
    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);
      this.subscribeToMessages();
    }, (error: Error) => { // Explicitly specify the type as 'Error'
      console.error('Error with websocket', error);
      // You may want to handle the error here, such as retrying the connection
    });
  }

  private subscribeToMessages(): void {
    this.stompClient.subscribe('/all/messages', (greeting: Stomp.Message) => {
      const messageContent = JSON.parse(greeting.body).content;
      console.log('Received message:', messageContent);
      // Handle the message content as needed
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
