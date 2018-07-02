import { Component, OnInit, Input } from '@angular/core';
import { Chat } from '../../../models/chat';
import { ChatGlobalService } from '../../../services/api/chat-global.service';
import { MessageService } from '../../../services/message.service';
import { AuthService } from '../../../services/auth.service';
import { UtilisateurService } from '../../../services/api/utilisateur.service';
import { User } from 'firebase';
import { ChatPartieService } from '../../../services/api/chat-partie.service';
import { Chatpartie } from '../../../models/chatpartie';
import { PartieService } from '../../../services/api/partie.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {


  // scrollCallback;

  @Input('currentUser')
  public currentUser: User;

  @Input('idPartie')
  public idPartie: number;

  @Input('dice')
  public dice: number;

  public chats = [];
  content = '';

  constructor(private authService: AuthService,
    private utilisateurService: UtilisateurService,
    private chatService: ChatGlobalService,
    private chatPartieService: ChatPartieService,
    private partieService: PartieService,
    private messageService: MessageService) {

  }




  ngOnInit() {

    if (this.dice) {
      console.log('in chat list dice : ' + this.dice);
      this.utilisateurService.getUtilisateur('1').subscribe(util => {
        this.partieService.getPartie(this.idPartie).subscribe(partie => {
          this.chatPartieService.add(new Chatpartie('Lancer de dés: ' + this.dice, util, partie)).subscribe(result => {
         //   this.messageService.showSuccess('add chatpartie ' + util.pseudo, 'BDD');
            this.content = '';
          });
        });
      });
    }

    console.log('in chat list idPartie ' + this.idPartie);
    // this.idPartie = 2;
    if (this.idPartie === 0) {   // global chat
      this.chatService.getChats()
        .subscribe(tab => {
          // this.chats = tab.slice(tab.length - 5, tab.length);
          this.chats = tab;
          console.log('document.body.scrollHeight ' + document.body.scrollHeight);
          window.scrollTo(0, document.body.scrollHeight);
          setInterval(() => this.getChats(0)
            , 5000);
        });

    } else {   // chat partie
      this.chatPartieService.getChats(this.idPartie)
        .subscribe(tab => {
          // this.chats = tab.slice(tab.length - 5, tab.length);
          this.chats = tab;
          console.log('document.body.scrollHeight ' + document.body.scrollHeight);
          window.scrollTo(0, document.body.scrollHeight);
          setInterval(() => this.getChats(this.idPartie)
            , 5000);
        });
    }

  }

  getChats(id: number) {
    if (id === 0) {
      this.chatService.getChats()
        .subscribe(tabRefr => {
          let i = tabRefr.findIndex((chat) => chat.id === this.chats[this.chats.length - 1].id);
          for (i + 1; i < tabRefr.length - 1; i++) {
            this.chats.push(tabRefr[i + 1]);
          }
        });

    } else {
      this.chatPartieService.getChats(id)
        .subscribe(tabRefr => {
          if (this.chats.length > 0) {
            let i = tabRefr.findIndex((chat) => chat.id === this.chats[this.chats.length - 1].id);
            for (i + 1; i < tabRefr.length - 1; i++) {
              this.chats.push(tabRefr[i + 1]);
            }
          }
        });
    }
  }


  public sendMessage(): void {
    if (this.content !== '') {
      this.utilisateurService.getUtilisateur('1').subscribe(util => {
        // enregistrement dans la bdd
        this.chatService.add(new Chat(this.content, util)).subscribe(result => {
          this.messageService.showSuccess('add chat ' + util.pseudo, 'BDD');
          this.content = '';
        });

      } else {
        this.utilisateurService.getUtilisateur(this.authService.currentUser.uid).subscribe(util => {
          this.partieService.getPartie(this.idPartie).subscribe(partie => {
            this.chatPartieService.add(new Chatpartie(this.content, util, partie)).subscribe(result => {
              this.messageService.showSuccess('add chatpartie ' + util.pseudo, 'BDD');
              this.content = '';
            });
          });
        });
      }
    }
  }

}
