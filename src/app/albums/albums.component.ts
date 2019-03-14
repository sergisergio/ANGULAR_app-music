import { Component, OnInit } from '@angular/core';

import { Album } from '../album';
import { ALBUMS } from '../mock-albums';
import { AlbumService } from '../album.service';

import {
    trigger,
    style,
    animate,
    transition,
    query,
    stagger,
} from '@angular/animations';
import { Observable } from 'rxjs';

import { merge} from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
    selector: 'app-albums',
    templateUrl: './albums.component.html',
    styleUrls: ['./albums.component.scss'],
    animations: [
        trigger('listAnimation', [
            transition('void => *', [
                query('div.card', [
                    // état par défaut
                    style({ transform: 'translateX(-200%)' }),
                    // appliqué un délais pour l'animation
                    stagger(1000, [
                        animate('1s ease-out', style({ transform: 'translateX(0)' }))
                    ])
                ])
            ])
        ]),
    ]
})
export class AlbumsComponent implements OnInit {

    titlePage: string = "Page principale Albums Music";
    albums: Album[] = ALBUMS;
    selectedAlbum: Album;
    status: string = null; // pour gérer l'affichage des caractères [play]
    count;

    constructor(private albumService: AlbumService) {
        // récupération des données depuis Firebase
        // console.log(this.ablumService.getAlbums().subscribe(
        //   albums => console.log(albums)
        // ))
    }

    ngOnInit() {

        // déterminer l'ordre dans lequel les Observables s'exécuteront
        const Albums = this.albumService.paginate(0, 5);
        const Count = this.albumService.count();

        const triggerAlbumsCount = merge(
          Count.pipe(
            map(c => this.count = c/5)
          ),
          Albums.pipe(
            map(albums => this.albums = albums)
          ),
        )

        triggerAlbumsCount.subscribe(m => console.log(m))
    }

    onSelect(album: Album) {
        //console.log(album);
        this.selectedAlbum = album;
    }

    playParent($event) {
        this.status = $event.id; // identifiant unique
        this.albumService.switchOn($event);
    }

    search($event) {
        if ($event) this.albums = $event;
    }

    paginate($event) {
        this.albumService.paginate($event.start, $event.end).subscribe(
            albums => this.albums = albums
        )
    }
}