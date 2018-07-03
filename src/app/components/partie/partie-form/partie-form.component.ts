import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PartieService } from '../../../services/api/partie.service';
import { Partie } from '../../../models/partie';
import { AuthService } from '../../../services/auth.service';
import { User } from 'firebase';
import { UtilisateurService } from '../../../services/api/utilisateur.service';
import { Upload } from '../../../models/upload';
import { UploadService } from '../../../services/upload.service';
import { MessageService } from '../../../services/message.service';
import { Utilisateur } from '../../../models/utilisateur';

@Component({
  selector: 'app-partie-form',
  templateUrl: './partie-form.component.html',
  styleUrls: ['./partie-form.component.css']
})
export class PartieFormComponent implements OnInit {

  url: string = null;
  currentUpload: Upload = null;


  @Output() sortie = new EventEmitter();
  @Input() entree: Partie;
  @Input() currentUser: User;
  // TODO input pour current User

  partieForm: FormGroup;
  formSubmitted = false;
  formtitle = 'Nouvelle Partie';
  buttontext = 'Créer';
  imageText = 'Choisir une image de départ';
  mjDispos: Utilisateur[];
  currentMJ: Utilisateur;


  constructor(private fb: FormBuilder, private messageService: MessageService,
    private uploadService: UploadService, private partieService: PartieService,
    private authService: AuthService, private utilService: UtilisateurService) { }

  ngOnInit() {
    console.log('in partie with input ' + this.currentUser.displayName);

    if (this.entree) {
      this.formtitle = 'Modification de partie';
      this.buttontext = 'Mettre à jour';
      this.imageText = 'Changer d\'image';
      console.log('entree trouvée');
      console.log('idpartie : ' + this.entree.id);
      console.log('nbjoueurs : ' + this.entree.nombreJoueurs);
      this.currentMJ = this.entree.mj;
      this.utilService.getUtilisateurNotInPartie(this.entree.id).subscribe(
        usersTrouves => {
          console.log('caca Users trouvés : ' + usersTrouves.length);
          this.mjDispos = usersTrouves;
          this.partieForm = this.fb.group({
            'titre': [this.entree.titre, Validators.compose([
              Validators.minLength(5),
              Validators.required
            ])],
            'description': [this.entree.description, Validators.compose([
              Validators.required
            ])],
            'nbJoueurs': [this.entree.nombreJoueurs, Validators.compose([
              Validators.required,
              Validators.min(1),
              Validators.max(6)
            ])],
            'image': [this.entree.image],
            'id': [this.entree.id],
            'mj': [this.entree.mj, Validators.compose([
              Validators.required
            ])]
          });
        }
      );
    } else {
      this.formtitle = 'Nouvelle Partie'; // réinitialisé pour ne pas poser problème avec la partie édition
      this.buttontext = 'Créer';
      console.log('pas d\'entrée trouvée');
      this.partieForm = this.fb.group({
        'titre': ['', Validators.compose([
          Validators.minLength(5),
          Validators.required
        ])],
        'description': ['', Validators.compose([
          Validators.required
        ])],
        'nbJoueurs': ['', Validators.compose([
          Validators.required,
          Validators.min(1),
          Validators.max(6)
        ])],
        'image': [''],
        'id': [''],
        'mj': ['']
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
    if (this.partieForm.valid) {
      console.log('Formulaire envoyé');
      if (this.partieForm.value['id'] === '') {
        console.log('id non trouvée');
        this.utilService.getUtilisateur(this.currentUser.uid).subscribe(
          user => {
            this.partieService.add(new Partie(
              null,
              user,
              '',
              this.partieForm.value['titre'],
              this.partieForm.value['description'],
              this.partieForm.value['nbJoueurs']
            )).subscribe(
              partieCreee => {
                console.log('Partie créée, id = ' + partieCreee.id);
                this.uploadService.pushUpload(this.currentUpload, partieCreee.id, 1).then( // upload img dans firebase et recup de l' url
                  (upload) => {
                    partieCreee.image = upload.url;
                    this.partieService.update(partieCreee).subscribe(
                      partieUpdate => {
                        this.messageService.showSuccess('Nouvelle partie crée', 'New Game');
                        this.partieForm.reset();
                        this.formSubmitted = false;
                        this.sortie.emit('INSERTED');
                      });
                  });
              }
            );
          }
        );
      } else {  // modification
        console.log('id trouvée');
        this.utilService.getUtilisateur(this.currentUser.uid).subscribe(
          user => {
            console.log('premier appel (currentUser.uid) ok');
            let mj;
            console.log('partieform.value : ' + this.partieForm.value['mj']);
            console.log('partieform.controls.value : ' + this.partieForm.controls.mj.value.toString());
            this.utilService.getUtilisateur(this.partieForm.value['mj']).subscribe(
              util => {
                console.log('deuxieme appel (partieForm.value) ok');
                console.log('value de nouveau mj : ' + util.id);
                mj = util;
                const id = this.partieForm.value['id'];
                this.uploadService.pushUpload(this.currentUpload, id, 1).then( // upload img dans firebase et recup de l' url
                  (upload) => {

                    this.partieService.update(new Partie(
                      id,
                      mj,
                      upload.url,
                      //     this.partieForm.value['image'],
                      this.partieForm.value['titre'],
                      this.partieForm.value['description'],
                      this.partieForm.value['nbJoueurs']
                    )).subscribe(
                      partieMaj => {
                        console.log('Partie maj, id = ' + partieMaj.id);
                        this.messageService.showSuccess('Update partie', '');
                        this.partieForm.reset();
                        this.formSubmitted = false;
                        if (mj.id === this.entree.mj.id) {
                          console.log('UPDATED');
                          this.sortie.emit('UPDATED');
                        } else {
                          console.log('MJ CHANGED');
                          this.sortie.emit('MJCHANGED');
                        }
                      }
                    );
                  });
              }
            );
          }
        );
      }
    }
  }

}
