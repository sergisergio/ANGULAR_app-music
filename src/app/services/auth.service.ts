import { Injectable } from '@angular/core';
// Importez les modules nécessaires pour l'authentification
import * as firebase from 'firebase/app';
import 'firebase/auth';
import {Router} from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authState: boolean = false;

    constructor(private router: Router) {
        // Observable il teste si l'utilisateur est connecté
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                this.authState = true;
            } else {
                this.authState = null;
            }
        });
    }
    // ...

    /*signIn() {
    return new Promise(
      (resolve, reject) => {
        setTimeout(
          () => {
            this.isAuth = true;
            resolve(true);
          }, 2000
        );
      }
    );
  }*/

  /*signOut() {
    this.isAuth = false;
  }*/

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

    authenticated() {}

    signOutUser() {
        firebase.auth().signOut();
    }
}