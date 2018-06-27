import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Upload } from '../../classes/upload';
import { UploadService } from '../../services/upload.service';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {
  newPSW = '';
  newEmail = '';
  newPseudo = '';
  newUrl = '';
  currentUser: firebase.User;
  // isAuth: boolean;
  currentUpload: Upload = null;

  signinForm: FormGroup;
  errorMessage: string;
  displayDialog = false;
  isUpdateEmail = true;

  modifPsImgForm: FormGroup;
  errorMessagePsImg: string;

  editDialog = false;

  constructor(private uploadService: UploadService,
    private formBuilder: FormBuilder, private router: Router,
    private messageService: MessageService,
    private authService: AuthService) { }

  ngOnInit() {

    this.authService.getCurrentUser().then(    // useless
      (user) => {
        this.currentUser = user;
        console.log(user.uid);
      },
      (error) => {
        this.currentUser = null;
      });


  }

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['/index']);
  }

  onOpenEditMod() {
    this.editDialog = true;
  }

  refresh(check: boolean) {
    this.editDialog = check;
  }

}
