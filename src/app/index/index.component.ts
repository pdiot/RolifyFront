import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  currentUser: firebase.User;


  constructor(private router: Router, private authService: AuthService, ) { }

  ngOnInit() {

    this.authService.getCurrentUser().then(
      (user) => {
        this.currentUser = user; console.log(user);
        this.router.navigate(['/lobby']);
      },
      (error) => {
        this.currentUser = null;
      });


  }

  gotoSignin() {
    this.router.navigate(['/auth/signin']);
  }

  gotoSignup() {
    this.router.navigate(['/auth/signup']);
  }

}
