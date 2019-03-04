import { Component, OnInit, Input } from '@angular/core';
import { AlbumService } from '../album.service';

@Component({
selector: 'app-audio-player',
templateUrl: './audioplayer.component.html',
styleUrls: ['./audioplayer.component.scss']
})
export class AudioPlayerComponent implements OnInit {

@Input() album : string;
showplayer: boolean = false;
// variable publique pour y avoir accès dans le template
current: number = 1;
total: number = 1;
ratio: number = 0;

constructor(private aS: AlbumService) { }

  ngOnInit() {

    // souscription au service qui est également un subject
    // Observable auquel on a souscrit
    // On lance le subject ouvert pour les players pas de désabonnement
    this.aS.subjectAlbum.subscribe(
      album => {
        // console.log(album)
        this.showplayer = true; // player
        this.current = 1;
        let duration = album.duration; // chaque morceau fait 120 secondes
        this.total = Math.floor(duration / 120); // nombre de morceau
        this.ratio = Math.floor(100 / this.total); // ratio pour la barre de progression avec Bootstrap
        let step = this.ratio;

        const timer = 120 * 1000; // toutes les deux minutes on passe au morceau suivant

        // console.log(this.total);
        // console.log(this.ratio);

        // toutes les deux minutes on passe au morceau suivant
        const player = setInterval(() => {
          this.current++;
          this.ratio += step; // on ajoute le ratio
          console.log(this.ratio);
          if (this.ratio > 100) {
            clearInterval(player);
            this.showplayer = false;
            // mise à jour du status dans l'album
            this.aS.switchOff(album); // mise à jour d'album
          }
        }, timer)
      }
)
}

}
