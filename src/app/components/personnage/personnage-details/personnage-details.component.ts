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
import {Upload} from '../../../models/upload';
import {UploadService} from '../../../services/upload.service';

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
  imageText = 'Choisir un avatar';
  url: string = null;
  currentUpload: Upload = null;

  constructor(private fb: FormBuilder, private authService: AuthService,
              private utilService: UtilisateurService, private persoService: PersonnageService,
              private assoService: AssociationService, private uploadService: UploadService) { }

  ngOnInit() {
    if (this.personnage) {
      // Affichage et/ou modification
      this.formtitle = 'Modification';
      this.buttontext = 'Sauvegarder';
      console.log('entrée trouvée');
      this.persoForm = this.fb.group({
        'id': [this.personnage.id, Validators.compose([])],
        'nom': [this.personnage.nom, Validators.compose([
          Validators.minLength(1),
          Validators.required
        ])],
        'race': [this.personnage.race, Validators.compose([
          Validators.required
        ])],
        'classe': [this.personnage.classe, Validators.compose([
          Validators.required
        ])],
        'sexe': [this.personnage.sexe, Validators.compose([
          Validators.required
        ])],
        'pv': [this.personnage.pv, Validators.compose([
          Validators.required
        ])],
        'fo': [this.personnage.fo, Validators.compose([
          Validators.required
        ])],
        'def': [this.personnage.defense, Validators.compose([
          Validators.required
        ])],
        'es': [this.personnage.esprit, Validators.compose([
          Validators.required
        ])],
        'int': [this.personnage.intelligence, Validators.compose([
          Validators.required
        ])],
        'init': [this.personnage.initiative, Validators.compose([
          Validators.required
        ])],
        'equipement': [this.personnage.equipement, Validators.compose([
        ])],
        'inventaire': [this.personnage.inventaire, Validators.compose([
        ])],
        'background': [this.personnage.background, Validators.compose([
        ])],
        'image': [this.personnage.urlAvatar, Validators.compose([
        ])]
      });
    } else {
      // Création
      this.formtitle = 'Nouveau Personnage';
      this.buttontext = 'Créer le personnage';
      console.log('pas d\'entrée trouvée');
      this.persoForm = this.fb.group({
        'id': ['', Validators.compose([])],
        'image': ['', Validators.compose([
      ])],
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
        ])]
      });
    }
  }

  onFileChanged(event) {  // recup de l'img et transformtion en Upload
    const file = event.target.files[0];
    this.currentUpload = new Upload(file);
    this.url = file.name;
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.persoForm.valid) {
      console.log('Formulaire valide envoyé');
      if (this.personnage === undefined) {
        // On est sur une création
        console.log('Formulaire valide envoyé pour création');
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
              this.uploadService.pushUpload(this.currentUpload, persoCree.id, 0).then( // upload img dans firebase et recup de l' url
                (upload) => {
                  persoCree.urlAvatar = upload.url;
                  this.persoService.update(persoCree).subscribe(
                    persoUpdate => {
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
                    });
                }
               );
            }
        ));
      } else {
        // On est sur une modification
        console.log('Formulaire valide envoyé pour modification');
        const id = this.persoForm.value['id'];
        this.uploadService.pushUpload(this.currentUpload, id, 0).then(
          (upload) => {
            this.persoService.update(new Personnage(
              this.personnage.id,
              this.persoForm.value['nom'],
              this.persoForm.value['classe'],
              this.persoForm.value['race'],
              this.persoForm.value['sexe'],
              upload.url,
              this.persoForm.value['pv'],
              this.persoForm.value['fo'],
              this.persoForm.value['def'],
              this.persoForm.value['es'],
              this.persoForm.value['int'],
              this.persoForm.value['init'],
              this.persoForm.value['eq'],
              this.persoForm.value['inv'],
              this.persoForm.value['background'],
              this.personnage.associations
            )).subscribe(
              persoMaj => {
                console.log('Personnage mis à jour : id = ' + persoMaj.id);
                this.sortie.emit('UPDATED');
              });
          }
        );
      }
    }
  }

}
