import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Upload } from '../../models/upload';
import { UploadService } from '../../services/upload.service';
import { MessageService } from '../../services/message.service';
import { AuthService } from '../../services/auth.service';
import { User } from 'firebase';


@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  // @Input() currentUser: User;
  currentUser: User;

  editDialog = false;

  constructor(private uploadService: UploadService,
   private router: Router,
    private messageService: MessageService,
    private authService: AuthService,
  ) { }

  ngOnInit() {

 // this.currentUser = this.currentUserService.currentUser;
// console.log('in lobby ' + this.currentUser.displayName);
    this.authService.getCurrentUser().then(    //
      (user) => {
        this.currentUser = user;
        console.log(user);
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

  goToPartie(): void {

  }

}
