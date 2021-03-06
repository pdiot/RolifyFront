import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Upload } from '../../../models/upload';
import { AuthService } from '../../../services/auth.service';
import { UploadService } from '../../../services/upload.service';
import { MessageService } from '../../../services/message.service';
import { UtilisateurService } from '../../../services/api/utilisateur.service';
import { Utilisateur } from '../../../models/utilisateur';



@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  currentUpload: Upload = null;
  url: string = null;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private uploadService: UploadService,
    private messageService: MessageService,
    private utilisateurService: UtilisateurService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,30}/)]],
      nom: ['', [Validators.required]],
      url: ['', [Validators.required]]
    });
  }

  onFileChanged(event) {  // recup de l'img et transformtion en Upload
    const file = event.target.files[0];
    this.currentUpload = new Upload(file);
    // this.url = this.signupForm.get('url').value;
    // console.log(' url ' +  this.url);
    this.url = file.name;
  }

  onSubmit() {
    const email = this.signupForm.get('email').value;
    const password = this.signupForm.get('password').value;
    const pseudo = this.signupForm.get('nom').value;

    // TODO a verifier

    this.authService.createNewUser(email, password).then(   // creation du user sur Firebase
      () => {
        // recup du user
        this.authService.getCurrentUser().then(
          (user) => {
            this.uploadService.pushUpload(this.currentUpload, user.uid, 0).then( // upload img dans firebase et recup de l' url
              (upload) => {
                this.authService.updateNamePhoto(pseudo, upload.url).then( // enregistrement du pseudo et de l'url dans firebase
                  () => {
                    // enregistrement dans la bdd
                    this.utilisateurService.add(new Utilisateur(user.uid, pseudo, upload.url)).subscribe(result => {
                      this.router.navigate(['/lobby']);
                      this.messageService.showSuccess(pseudo, 'Welcome');
                    });
                  },
                  (error) => {
                    this.router.navigate(['/lobby']);
                    this.messageService.showError('Oops.. error name or photo: ' + error, 'NEW PLAYER');
                  });

              },
              (error) => {
                this.errorMessage = error;
                console.log(error);
              });
          },
          (error) => {
            this.errorMessage = error;
            console.log(error);
          });
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
