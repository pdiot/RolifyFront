import { Utilisateur } from './utilisateur';

export class Chat {
    source: Utilisateur;
    dateTime: Date;
    body: string;



    constructor(body: string, source: Utilisateur) {
        this.body = body;
        this.source = source;
    }

}
