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
}
