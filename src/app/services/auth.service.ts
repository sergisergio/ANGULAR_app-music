import { Injectable } from '@angular/core';
// Importez les modules nécessaires pour l'authentification
import * as firebase from 'firebase/app';
import 'firebase/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { User } from '../models/User';




@Injectable({
    providedIn: 'root'
})
export class AuthService {

    private authState: boolean = false;
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private router: Router,
                private http: HttpClient) {
        // Observable il teste si l'utilisateur est connecté
        firebase.auth().onAuthStateChanged( (user) => {
            if (user) {
                this.authState = true;
            } else {
                this.authState = null;
            }
        });

        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

  auth(email: string, password: string): Promise<any> {

    return firebase.auth().signInWithEmailAndPassword(email, password);
  }

    createNewUser(email: string, password: string) {
        return new Promise(
          (resolve, reject) => {
            firebase.auth().createUserWithEmailAndPassword(email, password).then(
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



  logout() {

    firebase.auth().signOut().then(
      () => {
        this.router.navigate(['/albums'], { queryParams: { message: `Success logout` } });
      }
    );
  }

  // Return true if user is logged in
  authenticated(): boolean {
    return this.authState == true;
  }

}