import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs";
import {Stomp} from "@stomp/stompjs";
import * as SockJS from 'sockjs-client';


@Injectable({
  providedIn: 'root'
})
export class MonitorWebSocketService {
  // @ts-ignore
  private stompClient: Stomp.Client;

  private messageSubject = new BehaviorSubject<string>('');

  constructor() {
    const socket = new SockJS('/ws');
    this.stompClient = Stomp.over(socket);
    this.stompClient.connect({}, (frame) => {
      console.log(frame);
      this.stompClient.subscribe('/all/messages', (result) => {
        this.messageSubject.next(JSON.parse(result.body).text);
      });
    });
  }

  sendMessage(text: string) {
    this.stompClient.send("/app/application", {}, JSON.stringify({'text': text}));
  }

  getMessageSubject() {
    return this.messageSubject.asObservable();
  }
}
