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


  constructor(private fb: FormBuilder, private messageService: MessageService,
    private uploadService: UploadService, private partieService: PartieService,
    private authService: AuthService, private utilService: UtilisateurService) { }

  ngOnInit() {
    console.log('in partie with input ' + this.currentUser.displayName);

    if (this.entree) {
      console.log('entree trouvée');
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
                // this.partieForm.reset();
                // this.formSubmitted = false;
                // this.sortie.emit('INSERTED');
              }
            );
          }
        );
      } else {
      }
    }
  }

}
