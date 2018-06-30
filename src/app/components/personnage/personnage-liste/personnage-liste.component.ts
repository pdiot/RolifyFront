import {Component, Input, OnInit} from '@angular/core';
import {Partie} from '../../../models/partie';
import {Personnage} from '../../../models/personnage';
import {AssociationService} from '../../../services/api/association.service';
import {Association} from '../../../models/association';
import {Utilisateur} from '../../../models/utilisateur';
import {PartieService} from '../../../services/api/partie.service';
import {PersonnageService} from '../../../services/api/personnage.service';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-personnage-liste',
  templateUrl: './personnage-liste.component.html',
  styleUrls: ['./personnage-liste.component.css']
})
export class PersonnageListeComponent implements OnInit {

  @Input() partieId: number;
  partie: Partie;
  personnages: Array<[Personnage, Utilisateur]>;
  assos: Array<Association>;
  personnageToDisplay: Personnage;
  modalRef;
  constructor(private assoService: AssociationService,
              private partieService: PartieService,
              private personnageService: PersonnageService,
              private modalService: NgbModal) { }

  ngOnInit() {
    this.personnages = new Array<[Personnage, Utilisateur]>();
    this.partieService.getPartie(this.partieId).subscribe(
      partie => {
        this.partie = partie;
        this.assoService.getAssociationsJoueur(this.partie.id).subscribe(
          assosReceived => {
            this.assos = assosReceived;
            for (const asso of this.assos) {
              this.personnages.push([asso.personnage, asso.utilisateur]);
            }
          }
        );
      }
    );
  }

  open(content, personnage: Personnage) {
    this.personnageToDisplay = personnage;
    this.modalRef = this.modalService.open(content);
  }

  onUpdate(event) {
    this.ngOnInit();
    this.modalRef.close();
  }

}
