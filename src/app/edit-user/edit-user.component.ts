import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Upload } from '../classes/upload';
import { UploadService } from '../services/upload.service';
import { MessageService } from '../services/message.service';
import { User } from 'firebase';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {

  currentUser: User;

  newPSW = '';
  newEmail = '';
  newPseudo = '';
  newUrl = '';
  currentUpload: Upload = null;

  emailForm: FormGroup;
  errorMessageEmail: string;

  signinForm: FormGroup;
  errorMessage: string;
  displayDialog = false;
  isUpdateEmail = true;

  modifPsImgForm: FormGroup;
  errorMessagePsImg: string;

  constructor(private uploadService: UploadService,
    private formBuilder: FormBuilder, private router: Router,
    private messageService: MessageService,
    private authService: AuthService) { }

  ngOnInit() {

    this.authService.getCurrentUser().then(    // useless
      (user) => {
        this.currentUser = user;
        this.modifPsImgForm.get('pseudo').setValue(user.displayName);
        this.signinForm.get('ActEmail').setValue(user.email);
        this.emailForm.get('email').setValue(user.email);

      },
      (error) => {
        this.currentUser = null;
      });

    this.initFormReAuth();
    this.initFormPsImg();
    this.initEmailForm();

  }

  // ---------Email
  initEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmitmodifEmail() {
    this.isUpdateEmail = true;
    this.displayDialog = true;
  }


  initFormReAuth() {
    this.signinForm = this.formBuilder.group({
      ActEmail: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmitReAuth() {
    const email = this.signinForm.get('ActEmail').value;
    const password = this.signinForm.get('password').value;

    if (this.isUpdateEmail) {
      this.authService.updateEmail(email, password, this.newEmail).then(() => {
        // TODO message update reussie
        this.newEmail = '';
        this.signinForm.get('email').setValue = null;
        this.signinForm.get('password').setValue = null;
        this.displayDialog = false;
      })
        .catch(err => {
          // TODO message identifients incorrects
          console.log(err);
        });
    } else {
      this.authService.updatePassword(email, password, this.newPSW).then(() => {
        // TODO message update reussie
        this.newPSW = '';
        this.signinForm.get('email').setValue = null;
        this.signinForm.get('password').setValue = null;
        this.displayDialog = false;
      })
        .catch(err => {
          // TODO message identifients incorrects
          console.log(err);
        });
    }
  }

  onOpenDial(nb: number) {
    if (nb === 0) {  // Email
      this.displayDialog = true;
    } else {  // Password
      this.isUpdateEmail = false;
      this.displayDialog = true;
    }
  }

  // IMG - pseudo
  initFormPsImg() {
    this.modifPsImgForm = this.formBuilder.group({
      pseudo: ['', [Validators.required]],
      newUrl: ['']
    });
  }

  onFileChanged(event) {  // recup de l'img et transformtion en Upload
    const file = event.target.files[0];
    this.currentUpload = new Upload(file);
    this.newUrl = this.modifPsImgForm.get('newUrl').value;
    // console.log(' url ' +  this.url);
  }


  onSubmitmodifPsImg() {
    const pseudo = this.modifPsImgForm.get('pseudo').value;
    if (this.newUrl) { // changement d'avatar

      this.currentUser.getIdToken().then(
        (alienKey) => {  // Recup de l'id
          this.uploadService.pushUpload(this.currentUpload, alienKey).then( // upload img dans firebase et recup de l' url
            (upload) => {
              this.authService.updateNamePhoto(pseudo, upload.url).then( // enregistrement du pseudo et de l'img dans firebase
                () => {
                  this.router.navigate(['/lobby']);
                  this.messageService.showSuccess('Update success baby ' + pseudo, 'Update');
                },
                (error) => {
                  this.router.navigate(['/lobby']);
                  this.messageService.showSuccess('Welcome ' + pseudo + '; error name or photo', 'NEW PLAYER');
                });
            },
            (error) => {
              console.log(error);
            }
          );
        },
        (error) => {
          console.log(error);
        });

    } else { // pas de changement d'avatar
      this.authService.updateNamePhoto(pseudo, this.currentUser.photoURL).then( // enregistrement du pseudo et de l'img dans firebase
        () => {
          this.router.navigate(['/lobby']);
          this.messageService.showSuccess('Update success baby ' + pseudo, 'Update');
        },
        (error) => {
          this.router.navigate(['/lobby']);
          this.messageService.showSuccess('Welcome ' + pseudo + '; error name or photo', 'NEW PLAYER');
        });
    }
  }

}
