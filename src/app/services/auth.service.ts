import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: firebase.User;
  storageRef = firebase.storage().ref();

  constructor(private messageService: MessageService) {

  //  this.getCurrentUser();
    firebase.auth().languageCode = 'fr'; // langage du mail

  }

  getCurrentUser() {
    return new Promise<firebase.User>(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              this.currentUser = user;
              this.messageService.showSuccess('Welcome ' + user.displayName, 'Get User');
              resolve(user);
            } else {
               reject();
            }
          }
        );
      }
    );
  }

  createNewUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            this.messageService.showSuccess('Welcome new  ' , 'Sign up');
            resolve();
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signInUser(email: string, password: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().signInWithEmailAndPassword(email, password).then(
          () => {
            this.getCurrentUser().then(user => {
              this.messageService.showSuccess('Welcome back ' + user.displayName, 'Sign in');
              resolve(user);
            });
          },
          (error) => {
            reject(error);
          }
        );
      }
    );
  }

  signOutUser() {
    firebase.auth().signOut();
  }

  updateNamePhoto(nom: string, url: string) {
    return new Promise<any>(
      (resolve, reject) => {
        this.currentUser.updateProfile({
          displayName: nom,
          photoURL: url
        }).then(() => {
          // Update successful.
          resolve();
        }).catch((error) => {
          // An error happened.
          reject(error);
        });

      });
  }

  updatePassword(email: string, psw: string, newPsw: string) {
    return new Promise(
      (resolve, reject) => {
        // Prompt the user to re-provide their sign-in credentials
        // create the credentials from the SDK
        const credentials = firebase.auth.EmailAuthProvider.credential(
          email,
          psw
        );
        // reauthenticate
        this.currentUser.reauthenticateAndRetrieveDataWithCredential(credentials)
          .then(() => {
            // User re-authenticated.
            this.currentUser.updatePassword(newPsw)
              .then(function () {
                // Update successful.
                console.log('update psw');
                resolve(true);
              })
              .catch((error) => {
                // An error happened.
                reject(error);
                console.log(error);
              });

          }).catch(function (error) {
            // An error happened.
          });

      });
  }

  updateEmail(email: string, psw: string, newEmail: string) {
    return new Promise(
      (resolve, reject) => {
        // Prompt the user to re-provide their sign-in credentials
        // create the credentials from the SDK
        const credentials = firebase.auth.EmailAuthProvider.credential(
          email,
          psw
        );
        // reauthenticate
        this.currentUser.reauthenticateAndRetrieveDataWithCredential(credentials)
          .then(() => {
            // User re-authenticated.
            this.currentUser.updateEmail(newEmail)
              .then(function () {
                // Update successful.
                console.log('update email');
                resolve(true);
              })
              .catch((error) => {
                // An error happened.
                reject(error);
                console.log(error);
              });

          }).catch(function (error) {
            // An error happened.
          });

      });
  }

  emailReset(emailAddress: string) {
    firebase.auth().sendPasswordResetEmail(emailAddress).then(() => {
      // Email sent.
      console.log('email sent');
    }).catch((error) => {
      // An error happened.
      console.log(error);
    });
  }


}
