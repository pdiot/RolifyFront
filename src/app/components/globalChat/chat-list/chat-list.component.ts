import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
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

  @Input('idPartie')
  public idPartie: number;

  // @Input('dice')
  // public dice: number;

  public chats = [];
  content = '';

  dice: number;

  @ViewChild('cont') cont: any;

  constructor(private authService: AuthService,
    private utilisateurService: UtilisateurService,
    private chatService: ChatGlobalService,
    private messageService: MessageService) {

  }

  // scrolls to bottom whenever the page has loaded
  ionViewDidEnter() {
    this.cont.scrollToBottom(300); // 300ms animation speed
  }


  ngOnInit() {
    sessionStorage.setItem('value', '-1');

    if (this.idPartie === 0) {   // global chat
      this.chatService.getChats()
        .subscribe(tab => {
          this.chats = tab;
          console.log('document.body.scrollHeight ' + document.body.scrollHeight);
        //  this.cont.scrollToBottom(300); // 300ms animation speed
          setInterval(() =>
            this.getChats(0)
            , 1000);
        });

    } else {   // chat partie
      this.chatPartieService.getChats(this.idPartie)
        .subscribe(tab => {
          // this.chats = tab.slice(tab.length - 5, tab.length);
          this.chats = tab;
          console.log('document.body.scrollHeight ' + document.body.scrollHeight);
          window.scrollTo(0, document.body.scrollHeight);
          setInterval(() => {
            // interval
            this.dice = +sessionStorage.getItem('value');
            console.log('dice chat list ' + this.dice);
            if (this.dice !== -1) { this.sendMsgDice(this.dice); }
            this.getChats(this.idPartie);
          }
            , 1000);
        });
    }

  }

  getChats(id: number) {
    if (id === 0) {
      this.chatService.getChats()
        .subscribe(tabRefr => {
          if (this.chats.length === 0) {
            this.chats = tabRefr;
          } else {
            let i = tabRefr.findIndex((chat) => chat.id === this.chats[this.chats.length - 1].id);
            for (i + 1; i < tabRefr.length - 1; i++) {
              this.chats.push(tabRefr[i + 1]);
            }
          }
        });

    } else {
      this.chatPartieService.getChats(id)
        .subscribe(tabRefr => {
          if (this.chats.length === 0) {
            this.chats = tabRefr;
          } else {
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
      if (this.idPartie === 0) {   // global chat
        this.utilisateurService.getUtilisateur(this.authService.currentUser.uid).subscribe(util => {
          // enregistrement dans la bdd
          this.chatService.add(new Chat(this.content, util)).subscribe(result => {
            //  this.messageService.showSuccess('add chat ' + util.pseudo, 'BDD');
            this.content = '';
          });
        });
      });

      } else {
        this.utilisateurService.getUtilisateur(this.authService.currentUser.uid).subscribe(util => {
          this.partieService.getPartie(this.idPartie).subscribe(partie => {
            this.chatPartieService.add(new Chatpartie(this.content, util, partie)).subscribe(result => {
              //  this.messageService.showSuccess('add chatpartie ' + util.pseudo, 'BDD');
              this.content = '';
            });
          });
        });
      }
    }
  }

  sendMsgDice(n: number) {   // msg avec resultat du lancer from utilisateur
    this.utilisateurService.getUtilisateur('sys').subscribe(util => { // utilisateur systeme
      this.partieService.getPartie(this.idPartie).subscribe(partie => {
        this.chatPartieService.add(new Chatpartie('' + n, util, partie)).subscribe(result => {
          //  this.messageService.showSuccess('Résultat ' + util.pseudo, 'BDD');
          this.content = '';
        });
      });
    });
  }

}
