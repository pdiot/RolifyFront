import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Unsubscribe } from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  rootPage: any;


  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDvbmVUvOMBX_k7lN6OC1LhfwoGdXdnl3Y',
      authDomain: 'rolify-30ec4.firebaseapp.com',
      databaseURL: 'https://rolify-30ec4.firebaseio.com',
      projectId: 'rolify-30ec4',
      storageBucket: 'rolify-30ec4.appspot.com',
      messagingSenderId: '176487121895'
    };
    firebase.initializeApp(config);

    // const unsubscribe: Unsubscribe = firebase
    //   .auth()
    //   .onAuthStateChanged(user => {
    //     if (!user) {
    //       this.rootPage = 'index';
    //       unsubscribe();
    //     } else {
    //       this.rootPage = 'lobby';
    //       unsubscribe();
    //     }
    //   });
  }
}
