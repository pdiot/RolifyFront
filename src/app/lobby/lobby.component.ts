import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  newPSW = '';
  newEmail = '';
  currentUser: firebase.User;
  // isAuth: boolean;

  signinForm: FormGroup;
  errorMessage: string;
  displayDialog = false;
  isUpdateEmail = true;

  constructor(private formBuilder: FormBuilder, private router: Router, private authService: AuthService) { }

  ngOnInit() {

    this.authService.getCurrentUser().then(
      (user) => {
        this.currentUser = user; console.log(user);
      //  this.newEmail = this.currentUser.email;
      },
      (error) => {
        this.currentUser = null;
      });

    this.initFormReAuth();
  }

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['/index']);
  }

  initFormReAuth() {
    this.signinForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/[0-9a-zA-Z]{6,}/)]]
    });
  }

  onSubmitReAuth() {
    const email = this.signinForm.get('email').value;
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
          console.log(err); });
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
        console.log(err); });
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

}
