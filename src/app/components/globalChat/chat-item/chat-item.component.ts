import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../../models/chat';
import { Utilisateur } from '../../../models/utilisateur';
import { User } from 'firebase';

@Component({
  selector: 'app-chat-item',
  templateUrl: './chat-item.component.html',
  styleUrls: ['./chat-item.component.css']
})
export class ChatItemComponent implements OnInit {

  @Input('chat')
  public chat: Chat;
  @Input('currentUser')
  public currentUser: User;

  constructor() { }

  ngOnInit() {
console.log('chat ' + this.chat.source.id);
console.log('currentUser' + this.currentUser.uid);

  }

}
