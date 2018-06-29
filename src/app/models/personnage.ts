import {Association} from './association';

export class Personnage {
  id: number;
  nom: string;
  classe: string;
  race: string;
  sexe: string;
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
}
