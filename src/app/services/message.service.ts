import { Injectable } from '@angular/core';
import { Message } from 'primeng/primeng';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

 // messages: string[] = [];
  msgs: Message[] = [];

  showSuccess(text: string, title: string) {
    // this.msgs = [];
    this.msgs.push({ severity: 'success', summary: title, detail: text });
  }

}
