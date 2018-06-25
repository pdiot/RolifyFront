import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lobby',
  templateUrl: './lobby.component.html',
  styleUrls: ['./lobby.component.css']
})
export class LobbyComponent implements OnInit {

  currentUser: firebase.User;
  // isAuth: boolean;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {

    this.authService.getCurrentUser().then(
      (user) => { this.currentUser = user; console.log(user); },
      (error) => {
        this.currentUser = null;
      });

  }

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['/index']);

  }

}
