import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../../models/chat';
import { User } from '../../../models/user';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  public chats: Chat[] = [new Chat('yeah baby yeah', new User()), new Chat('meuuuuh', new User())];

  content = '';

  constructor() { }

  ngOnInit() {
  }


  public sendMessage(): void {
    const chat = new Chat(this.content, new User());
    this.chats.push(chat);
this.content = '';
  }


}
