import { Chat } from './chat';

export class Utilisateur {
    id: string;
    pseudo: string;
    urlAvatar: string;
   // messages: Chat[];

    constructor(id: string, pseudo: string, urlAvatar: string) {
        this.id = id;
        this.pseudo = pseudo;
        this.urlAvatar = urlAvatar;
     }
}
