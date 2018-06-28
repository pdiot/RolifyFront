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

  @Input('utilisateur')
  public utilisateur: Utilisateur;
  public chats: Chat[] = [];
  content = '';

  constructor(private authService: AuthService,
    private utilisateurService: UtilisateurService,
    private chatService: ChatGlobalService,
    private messageService: MessageService) { }

  ngOnInit() {

  }




  public sendMessage(): void {
    if (this.content !== '') {
      this.utilisateurService.getUtilisateur(this.authService.currentUser.uid).subscribe(util => {
        console.log('chat list sendMessage ' + util.pseudo);
        // enregistrement dans la bdd
      this.chatService.add(new Chat(this.content, new Utilisateur(util.id, util.pseudo, util.urlAvatar))).subscribe(result => {
          this.messageService.showSuccess('add chat ' + util.pseudo, 'BDD');
          this.content = '';
        });
      });

    }
  }


}
