import {Utilisateur} from './utilisateur';
import {Association} from './association';
import {Chatpartie} from './chatpartie';

export class Partie {

id: number;
mj: Utilisateur;
image: string;
titre: string;
description: string;
nombreJoueurs: number;
joueurs: Array<Utilisateur>;
associations: Array<Association>;
messages: Array<Chatpartie>;

}
