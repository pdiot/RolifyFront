import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PartieService} from '../../../services/api/partie.service';
import {Partie} from '../../../models/partie';
import {AuthService} from '../../../services/auth.service';
import {User} from 'firebase';
import {UtilisateurService} from '../../../services/api/utilisateur.service';

@Component({
  selector: 'app-partie-form',
  templateUrl: './partie-form.component.html',
  styleUrls: ['./partie-form.component.css']
})
export class PartieFormComponent implements OnInit {



  @Output() sortie = new EventEmitter();
  @Input() entree: Partie;

  partieForm: FormGroup;
  formSubmitted = false;
  formtitle = 'Nouvelle Partie';
  buttontext = 'Créer';
  currentUser: User;

  constructor(private fb: FormBuilder, private partieService: PartieService,
              private authService: AuthService, private utilService: UtilisateurService) { }

  ngOnInit() {


    this.authService.getCurrentUser().then(    // plus sure
      (user) => {
        this.currentUser = user;
        console.log('in lobby ' + user);
        if (this.entree) {
          console.log('entree trouvée');
        } else {
          this.formtitle = 'Nouvelle Partie'; // réinitialisé pour ne pas poser problème avec la partie édition
          this.buttontext = 'Créer';
          console.log('pas d\'entrée trouvée');
          this.partieForm = this.fb.group({
            'titre': [ '', Validators.compose([
              Validators.minLength(5),
              Validators.required
            ])],
            'description': [ '', Validators.compose([
              Validators.required
            ])],
            'nbJoueurs': [ '', Validators.compose([
              Validators.required,
              Validators.min(1),
              Validators.max(6)
            ])],
            'image': [''],
            'id': [''],
            'mj': ['']
          });
        }
      },
      (error) => {
        this.currentUser = null;
      });
  }

  submitForm() {
    this.formSubmitted = true;
    if (this.partieForm.valid) {
      console.log('Formulaire envoyé');
      if (this.partieForm.value['id'] === '') {
        this.utilService.getUtilisateur(this.currentUser.uid).subscribe(
          user => {
            this.partieService.add(new Partie(
              null,
              user,
              this.partieForm.value['image'],
              this.partieForm.value['titre'],
              this.partieForm.value['description'],
              this.partieForm.value['nbJoueurs']
            )).subscribe(
              partieCreee => {
                console.log('Partie créée, id = ' + partieCreee.id);
                this.partieForm.reset();
                this.formSubmitted = false;
                this.sortie.emit('INSERTED');
              }
            );
          }
        );
      } else {
      }
    }
  }

}
