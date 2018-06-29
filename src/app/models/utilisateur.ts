import { Chat } from './chat';
import {Association} from './association';
import {Partie} from './partie';
import {GroupeDiscussion} from './groupe-discussion';

export class Utilisateur {
    id: string;
    pseudo: string;
    urlAvatar: string;
    associations: Array<Association>;
    partiesMJ: Array<Partie>;
    partiesJoueur: Array<Partie>;
    messages: Array<Chat>;
    groupes: Array<GroupeDiscussion>;

    constructor(id: string, pseudo: string, urlAvatar: string) {
        this.id = id;
        this.pseudo = pseudo;
        this.urlAvatar = urlAvatar;
     }
}
