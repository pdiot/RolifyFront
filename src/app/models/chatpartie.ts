import { Chat } from './chat';
import { Partie } from './partie';
import { Utilisateur } from './utilisateur';

export class Chatpartie extends Chat {
  partie: Partie;

  constructor(body: string, source: Utilisateur, partie: Partie) {
    super(body, source);
    this.partie = partie;
  }
}
