import {Utilisateur} from './utilisateur';
import {Chatprive} from './chatprive';

export class GroupeDiscussion {
  id: number;
  utilisateurs: Array<Utilisateur>;
  messages: Array<Chatprive>;
}
