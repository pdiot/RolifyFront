import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  currentUser: firebase.User;
  isReady = false;   // pour que la page s'affiche seulement si pas de user

  constructor(private router: Router, private authService: AuthService, ) { }

  ngOnInit() {

    this.authService.getCurrentUser().then(
      (user) => {
        this.currentUser = user; console.log(user);
        this.router.navigate(['/lobby']);
      },
      (error) => {
        this.currentUser = null;
        this.isReady = true;
      });


  }

  gotoSignin() {
    this.router.navigate(['/auth/signin']);
  }

  gotoSignup() {
    this.router.navigate(['/auth/signup']);
  }

}
