import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { interval } from 'rxjs'; // Observable
import { take, map, mergeMap } from 'rxjs/operators'; // opérateurs
import { Album } from '../album';

@Component({
    selector: 'app-audio-player',
    templateUrl: './audioplayer.component.html',
    styleUrls: ['./audioplayer.component.scss']
})
export class AudioPlayerComponent implements OnInit {

    current: number = 1;
    total: number;
    ratio: number = 0;
    step: number;
    album: Album;

    constructor(private aS: AlbumService) { }

    ngOnInit() {

        // définir un streaming de chanson simulé
        const interval$ = interval(12 * 100);

        this.aS.subjectAlbum
            .pipe(
                // mergeMap permet de merger les observables
                mergeMap(album => {
                        this.total = Math.floor(album.duration / 120)
                        this.album = album;

                        return interval$.pipe(
                            take(this.total),
                            // partir de 1 et non de 0
                            map(x => x + 1)
                        )
                    }
                )
            )
            .subscribe(
                x => {
                    this.current = x;
                    this.ratio = Math.floor(x * (100 / this.total));

                    // remettre à jour les données bar de progression et album
                    if(this.current == this.total){
                        this.aS.switchOff(this.album);
                        this.total = null;
                        this.ratio = 0;
                        this.current = 1;
                    }
                }
            )

    }

}