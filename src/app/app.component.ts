import { Component, OnInit } from '@angular/core';
//import { GuardService } from './guard.service';

import { interval, Observable } from 'rxjs';
import { take, map } from 'rxjs/operators'; // opérateurs

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app-music';
  count: Observable<number>;
  time: string;

  constructor(/*public guard: GuardService*/) {

    // interval envoi toutes les secondes un compteur 1, 2, ...
    this.count = interval(1000);
    // on prépare les données avant de souscrire à l'Observable
    const interval$ = this.count.
      pipe(
        map(num => {
          let hours = Math.floor(num / 3600);
          let minutes = Math.floor(num / 60);

          return `${hours} h ${minutes - hours * 60} min ${num - minutes * 60} s`
        }),
        take(12 * 60 * 3) // permet d'arrêter ici au bout de 12*3 minutes interval particulier à interval RxJS 6
    )

    // on souscrit à l'Observable interval
    interval$.subscribe(
        num => this.time = num
    );
  }
}
