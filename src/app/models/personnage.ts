import {Association} from './association';

export class Personnage {
  id: number;
  nom: string;
  classe: string;
  race: string;
  sexe: string;
  urlAvatar: string;
  pv: number;
  fo: number;
  defense: number;
  esprit: number;
  intelligence: number;
  initiative: number;
  equipement: string;
  inventaire: string;
  background: string;
  associations: Array<Association>;
  constructor(
    id: number,
    nom: string,
    classe: string,
    race: string,
    sexe: string,
    urlAvatar: string,
    pv: number,
    fo: number,
    defense: number,
    esprit: number,
    intelligence: number,
    initiative: number,
    equipement: string,
    inventaire: string,
    background: string,
    associations: Array<Association>) {
      this.nom = nom;
      this.classe = classe;
      this.race = race;
      this.sexe = sexe;
      this.urlAvatar = urlAvatar;
      this.pv = pv;
      this.fo = fo;
      this.defense = defense;
      this.esprit = esprit;
      this.intelligence = initiative;
      this.equipement = equipement;
      this.inventaire = inventaire;
      this.background = background;
      this.associations = associations;
  }
}
