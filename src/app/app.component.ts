import { Component } from '@angular/core';
import { interval } from 'rxjs';
import { take, map } from 'rxjs/operators'; // opérateurs;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'app-music';
  time: string;

    constructor(){

        // interval envoi toutes les secondes un compteur 1, 2, ...
        const interval$ = interval(1000).
        pipe(
            map(second => {
                let hours = Math.floor(second / 3600);
                let minutes = Math.floor(second / 60);

                return `${hours} h ${minutes - hours * 60} min ${second - minutes * 60} s`
            }),
            take(12 * 60 * 3) // permet d'arrêter ici au bout de 12*3 minutes interval particulier à interval RxJS 6
        )

        // on souscrit à l'Observable interval
        interval$.subscribe(
            time => this.time = time
        );
    }

}
