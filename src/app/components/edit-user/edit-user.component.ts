import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from 'firebase';
import { Upload } from '../../models/upload';
import { UploadService } from '../../services/upload.service';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  @Output() refresh = new EventEmitter<boolean>();

  isReAuth = false;

  currentUser: User;

  newUrl = '';
  currentUpload: Upload = null;

  emailForm: FormGroup;
  errorMessageEmail: string;

  pswForm: FormGroup;
  errorMessagePsw: string;

  signinForm: FormGroup;
  errorMessage: string;
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
    this.initPswForm();
  }

  // ---------Email
  initEmailForm() {
    this.emailForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }
  onSubmitmodifEmail() {
    this.isUpdateEmail = true;
    this.isReAuth = true;
  }

  // ---------Psw
  initPswForm() {
    this.pswForm = this.formBuilder.group({
      psw1: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      psw2: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],

    });
  }
  onSubmitmodifPsw() {
    const psw1 = this.pswForm.get('psw1').value;
    const psw2 = this.pswForm.get('psw2').value;
    if (psw1 !== psw2) {  // passwords differents
      this.errorMessagePsw = 'Passwords différents';
    } else {
      this.isUpdateEmail = false;
      this.isReAuth = true;
    }
  }

  // ---------- Re Authentification
  initFormReAuth() {
    this.signinForm = this.formBuilder.group({
      ActEmail: ['', [Validators.required, Validators.email]],
      ActPsw: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmitReAuth() {
    const email = this.signinForm.get('ActEmail').value;
    const password = this.signinForm.get('ActPsw').value;

    if (this.isUpdateEmail) {  // update email
      const newEmail = this.emailForm.get('email').value;
      this.authService.updateEmail(email, password, newEmail)
        .then(() => {
          // TODO message update reussie
          this.emailForm.get('email').setValue(newEmail);
          this.signinForm.get('ActEmail').setValue(newEmail);
          this.signinForm.get('ActPsw').setValue(null);
          this.isReAuth = false;
          this.errorMessage = '';
          this.refresh.emit(false);
        })
        .catch(err => {
          this.errorMessage = err;
        });

    } else {          // update password
      const newPSW = this.pswForm.get('psw1').value;

      this.authService.updatePassword(email, password, newPSW).then(() => {
        // TODO message update reussie
        // this.signinForm.get('ActEmail').setValue = null;
        this.pswForm.get('psw1').setValue(null);
        this.pswForm.get('psw2').setValue(null);
        this.signinForm.get('ActPsw').setValue(null);
        this.errorMessage = '';
        this.isReAuth = false;
        this.refresh.emit(false);

      })
        .catch(err => {
          this.errorMessage = err;
          console.log(err);
        });
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
    // this.newUrl = this.modifPsImgForm.get('newUrl').value;
    // console.log(' url ' +  this.url);
    this.newUrl = file.name;
  }


  onSubmitmodifPsImg() {
    const pseudo = this.modifPsImgForm.get('pseudo').value;
    if (this.newUrl) { // changement d'avatar

      this.uploadService.pushUpload(this.currentUpload, this.currentUser.uid).then( // upload img dans firebase et recup de l' url
        (upload) => {
          this.authService.updateNamePhoto(pseudo, upload.url).then( // enregistrement du pseudo et de l'img dans firebase
            () => {
              this.refresh.emit(false);
              this.errorMessagePsImg = '';
              this.messageService.showSuccess('Update success baby ' + pseudo, 'Update');
            },
            (error) => {
              this.errorMessagePsImg = error.message;
              console.log(error);
            });
        },
        (error) => {
          this.errorMessagePsImg = error.message;
          console.log(error);
        }
      );

    } else { // pas de changement d'avatar
      this.authService.updateNamePhoto(pseudo, this.currentUser.photoURL).then( // enregistrement du pseudo et de l'img dans firebase
        () => {
          this.refresh.emit(false);
          this.messageService.showSuccess('Update success baby ' + pseudo, 'Update');
        },
        (error) => {
          this.errorMessagePsImg = error.message;
        });
    }
  }

}
