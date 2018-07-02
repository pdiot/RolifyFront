import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  constructor(private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {



    this.authService.getCurrentUser().then((user) => {
      console.log('in index if ' + user);
      if (user) {
        this.router.navigate(['/lobby']);
      }
    });

    // // console.log('in index' + this.currentUserService.currentUser.displayName);
    // if (this.currentUserService.currentUser) {
    //   console.log('in index' + this.currentUserService.currentUser.displayName);
    //   this.router.navigate(['/lobby']);
    // }
  }

  // gotoLobby() {
  //   if (this.currentUserService.currentUser) {
  //     console.log('basta moove' + this.currentUserService.currentUser.displayName);
  //     this.router.navigate(['/lobby']);
  //   }
  // }

  gotoSignin() {
    this.router.navigate(['/auth/signin']);
  }

  gotoSignup() {
    this.router.navigate(['/auth/signup']);
  }

}
