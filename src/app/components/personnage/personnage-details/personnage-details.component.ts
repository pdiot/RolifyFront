import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Personnage} from '../../../models/personnage';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {UtilisateurService} from '../../../services/api/utilisateur.service';
import {AuthService} from '../../../services/auth.service';
import {PersonnageService} from '../../../services/api/personnage.service';
import {AssociationService} from '../../../services/api/association.service';
import {User} from 'firebase';
import {Association} from '../../../models/association';
import {Partie} from '../../../models/partie';
import {Role} from '../../../enums/role.enum';

@Component({
  selector: 'app-personnage-details',
  templateUrl: './personnage-details.component.html',
  styleUrls: ['./personnage-details.component.css']
})
export class PersonnageDetailsComponent implements OnInit {

  @Input() personnage: Personnage;
  @Output() sortie = new EventEmitter();
  @Input() currentUser: User;
  @Input() partie: Partie;
  persoForm: FormGroup;
  formSubmitted = false;
  formtitle = 'Nouveau Personnage';
  buttontext = 'Créer le personnage';
  imageText = 'Choisir une image de départ';

  constructor(private fb: FormBuilder, private authService: AuthService,
              private utilService: UtilisateurService, private persoService: PersonnageService,
              private assoService: AssociationService) { }

  ngOnInit() {
    if (this.personnage) {
      // Affichage et/ou modification
    } else {
      // Création
      this.formtitle = 'Nouveau Personnage';
      this.buttontext = 'Créer le personnage';
      console.log('pas d\'entrée trouvée');
      this.persoForm = this.fb.group({
        'id': ['', Validators.compose([])],
        'nom': ['', Validators.compose([
          Validators.minLength(1),
          Validators.required
        ])],
        'race': ['', Validators.compose([
          Validators.required
        ])],
        'classe': ['', Validators.compose([
          Validators.required
        ])],
        'sexe': ['', Validators.compose([
          Validators.required
        ])],
        'pv': ['', Validators.compose([
          Validators.required
        ])],
        'fo': ['', Validators.compose([
          Validators.required
        ])],
        'def': ['', Validators.compose([
          Validators.required
        ])],
        'es': ['', Validators.compose([
          Validators.required
        ])],
        'int': ['', Validators.compose([
          Validators.required
        ])],
        'init': ['', Validators.compose([
          Validators.required
        ])],
        'equipement': ['', Validators.compose([
        ])],
        'inventaire': ['', Validators.compose([
        ])],
        'background': ['', Validators.compose([
        ])],
      });
    }
  }

  click() {
    this.sortie.emit('OK');
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.persoForm.valid) {
      console.log('Formulaire valide envoyé');
      if (this.personnage === undefined) {
        // On est sur une création
        console.log('Formulaire valide envoyé');
        this.utilService.getUtilisateur(this.currentUser.uid).subscribe(
          user => this.persoService.add(new Personnage(
            null,
            this.persoForm.value['nom'],
            this.persoForm.value['classe'],
            this.persoForm.value['race'],
            this.persoForm.value['sexe'],
            null, // TODO Avatar
            this.persoForm.value['pv'],
            this.persoForm.value['fo'],
            this.persoForm.value['def'],
            this.persoForm.value['es'],
            this.persoForm.value['int'],
            this.persoForm.value['init'],
            this.persoForm.value['eq'],
            this.persoForm.value['inv'],
            this.persoForm.value['background'],
            null
          )).subscribe(
            persoCree => {
              console.log('Personnage crée : id = ' + persoCree.id);
              this.assoService.add(new Association(
                null,
                user,
                this.partie,
                persoCree,
                Role.Joueur
              )).subscribe(
                assoCreee => {
                  console.log('Association créée : id = ' + assoCreee.id);
                  this.sortie.emit('CREATED');
                }
              );
            }
          )
        );
      }
    }
  }

}
