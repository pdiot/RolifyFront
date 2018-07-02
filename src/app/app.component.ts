import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { Unsubscribe, User } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  currentUser: User;

  constructor() { }
  // Initialize Firebase
  config = {
    apiKey: 'AIzaSyDvbmVUvOMBX_k7lN6OC1LhfwoGdXdnl3Y',
    authDomain: 'rolify-30ec4.firebaseapp.com',
    databaseURL: 'https://rolify-30ec4.firebaseio.com',
    projectId: 'rolify-30ec4',
    storageBucket: 'rolify-30ec4.appspot.com',
    messagingSenderId: '176487121895'
  };

  ngOnInit() {
    console.log('on init app comp');
    firebase.initializeApp(this.config);

    // const unsubscribe: Unsubscribe = firebase
    //   .auth()
    //   .onAuthStateChanged(user => {
    //     if (!user) {
    //       console.log('appts no');
    //       unsubscribe();
    //     } else {
    //       console.log('appts ' + user.displayName);
    //       this.currentUser = user;
    //       unsubscribe();
    //     }
    //   });
  }
}
