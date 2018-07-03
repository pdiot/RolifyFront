import {Utilisateur} from './utilisateur';
import {Partie} from './partie';
import {Personnage} from './personnage';
import {Role} from '../enums/role.enum';

export class Association {
  id: number;
  utilisateur: Utilisateur;
  partie: Partie;
  personnage: Personnage;
  role: Role;

  constructor(id: number, utilisateur: Utilisateur, partie: Partie, personnage: Personnage, role: Role) {
    this.id = id;
    this.utilisateur = utilisateur;
    this.partie = partie;
    this.personnage = personnage;
    this.role = role;
  }
}
