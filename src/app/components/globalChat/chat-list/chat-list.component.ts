import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../../models/chat';
import { Utilisateur } from '../../../models/utilisateur';
import { ChatGlobalService } from '../../../services/api/chat-global.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { UtilisateurService } from '../../../services/api/utilisateur.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {


  scrollCallback;

  @Input('utilisateur')
  public utilisateur: Utilisateur;
  public chats: Chat[] = [];
  content = '';

  constructor(private authService: AuthService,
    private utilisateurService: UtilisateurService,
    private chatService: ChatGlobalService,
    private messageService: MessageService) {

  }




  ngOnInit() {
    this.chatService.getChats()
      .subscribe(tab => {
        // this.chats = tab.slice(tab.length - 5, tab.length);
        this.chats = tab;
        setInterval(() => this.chatService.getChats()
          .subscribe(tabRefr => {
            let i = tabRefr.findIndex((chat) => chat.id === this.chats[this.chats.length - 1].id);
            console.log('i' + i);
            for (i + 1; i < tabRefr.length - 1; i++) {
              this.chats.push(tabRefr[i + 1]);
            }
          })
          , 5000);
      });

  }



  public sendMessage(): void {
    if (this.content !== '') {
      console.log('this.authService.currentUser.uid ' + this.authService.currentUser.uid);
      this.utilisateurService.getUtilisateur(this.authService.currentUser.uid).subscribe(util => {
        console.log('chat list sendMessage ' + util.pseudo);
        // enregistrement dans la bdd
        this.chatService.add(new Chat(this.content, util)).subscribe(result => {
          this.messageService.showSuccess('add chat ' + util.pseudo, 'BDD');
          this.content = '';
        });
      });

    }
  }


}
