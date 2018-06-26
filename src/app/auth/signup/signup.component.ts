import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { Upload } from '../../classes/upload';
import { UploadService } from '../../services/upload.service';
import { MessageService } from '../../services/message.service';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  errorMessage: string;
  currentUpload: Upload = null;


  constructor(private formBuilder: FormBuilder,
    private authService: AuthService,
    private uploadService: UploadService,
    private messageService: MessageService,
    private router: Router) { }

  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]],
      nom: ['', [Validators.required]],
      url: ['', [Validators.required]]
    });
  }

  onFileChanged(event) {  // recup de l'img et transformtion en Upload
    const file = event.target.files[0];
    this.currentUpload = new Upload(file);
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
            user.getIdToken().then(
              (alienKey) => {  // Recup de l'id
                this.uploadService.pushUpload(this.currentUpload, alienKey).then( // upload img dans firebase et recup de l' url
                  (upload) => {
                    this.authService.updateNamePhoto(pseudo, upload.url).then( // enregistrement du pseudo et de l'img dans firebase
                      () => {
                        this.router.navigate(['/lobby']);
                        this.messageService.showSuccess('Welcome ' + pseudo, 'NEW PLAYER');
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
          },
          (error) => {
            console.log(error);
          });
      },
      (error) => {
        this.errorMessage = error;
      }
    );
  }

}
