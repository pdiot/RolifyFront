import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor() {
    // Initialize Firebase
    const config = {
      apiKey: 'AIzaSyDvbmVUvOMBX_k7lN6OC1LhfwoGdXdnl3Y',
      authDomain: 'rolify-30ec4.firebaseapp.com',
      databaseURL: 'https://rolify-30ec4.firebaseio.com',
      projectId: 'rolify-30ec4',
      storageBucket: '',
      messagingSenderId: '176487121895'
    };
    firebase.initializeApp(config);
  }
}
