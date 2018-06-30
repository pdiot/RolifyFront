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

constructor (id: number,
  mj: Utilisateur,
  image: string,
  titre: string,
  description: string,
  nombreJoueurs: number) {
  this.id = id;
  this.mj = mj;
  this.image = image;
  this.titre = titre;
  this.description = description;
  this.nombreJoueurs = nombreJoueurs;
  this.joueurs = new Array<Utilisateur>();
  this.associations = new Array<Association>();
  this.messages = new Array<Chatpartie>();
}

}
