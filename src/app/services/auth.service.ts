import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  currentUser: firebase.User;

  constructor() {
    this.getCurrentUser();
  }

  getCurrentUser() {
    return new Promise<firebase.User>(
      (resolve, reject) => {
        firebase.auth().onAuthStateChanged(
          (user) => {
            if (user) {
              this.currentUser = user;
              resolve(user);
            } else {
              // reject();
            }
          }
        );
      }
    );
  }

  createNewUser(email: string, password: string, pseudo: string, imgURL: string) {
    return new Promise(
      (resolve, reject) => {
        firebase.auth().createUserWithEmailAndPassword(email, password).then(
          () => {
            // TODO lien avec BDD
            this.getCurrentUser().then(
              (user) => {
                this.currentUser = user;
                this.currentUser.updateProfile({
                  displayName: pseudo,
                  photoURL: imgURL
                }).then(function () {
                  console.log('update succes');
                  // Update successful.
                }).catch(function (error) {
                  // An error happened.
                });
              },
              (error) => {
                this.currentUser = null;
              });

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
            resolve();
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
    this.getCurrentUser().then(
      (user) => {
        this.currentUser = user;
        this.currentUser.updateProfile({
          displayName: nom,
          photoURL: url
        }).then(function () {
          console.log('update succes');
          // Update successful.
        }).catch(function (error) {
          // An error happened.
        });
      },
      (error) => {
        this.currentUser = null;
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

}
