import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../../models/chat';
import { ChatGlobalService } from '../../../services/api/chat-global.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { UtilisateurService } from '../../../services/api/utilisateur.service';
import { User } from 'firebase';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {


  scrollCallback;

  @Input('currentUser')
  public currentUser: User;

  public chats: Chat[] = [];
  content = '';

  constructor(private authService: AuthService,
    private utilisateurService: UtilisateurService,
    private chatService: ChatGlobalService,
    private messageService: MessageService) {

  }




  ngOnInit() {
console.log('in chat list ' + this.currentUser);

    this.chatService.getChats()
      .subscribe(tab => {
        // this.chats = tab.slice(tab.length - 5, tab.length);
        this.chats = tab;
        console.log('document.body.scrollHeight ' + document.body.scrollHeight);
        window.scrollTo(0, document.body.scrollHeight);
        setInterval(() => this.getChats()
          , 10000);
      });

  }

   getChats() {
    this.chatService.getChats()
    .subscribe(tabRefr => {
      let i = tabRefr.findIndex((chat) => chat.id === this.chats[this.chats.length - 1].id);
      for (i + 1; i < tabRefr.length - 1; i++) {
        this.chats.push(tabRefr[i + 1]);
      }
    });
  }


  public sendMessage(): void {
    if (this.content !== '') {
      this.utilisateurService.getUtilisateur(this.authService.currentUser.uid).subscribe(util => {
        // enregistrement dans la bdd
        this.chatService.add(new Chat(this.content, util)).subscribe(result => {
          this.messageService.showSuccess('add chat ' + util.pseudo, 'BDD');
          this.content = '';
        });
      });

    }
  }


}
