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

    constructor(private ablumService: AlbumService) {
        // récupération des données depuis Firebase
        // console.log(this.ablumService.getAlbums().subscribe(
        //   albums => console.log(albums)
        // ))
    }

    ngOnInit() {
        this.ablumService.paginate(0, 5).subscribe(albums => this.albums = albums);
        this.count = this.ablumService.count().subscribe(
            count => this.count = count
        );
    }

    onSelect(album: Album) {
        //console.log(album);
        this.selectedAlbum = album;
    }

    playParent($event) {
        this.status = $event.id; // identifiant unique
        this.ablumService.switchOn($event);
    }

    search($event) {
        if ($event) this.albums = $event;
    }

    paginate($event) {
        this.ablumService.paginate($event.start, $event.end).subscribe(
            albums => this.albums = albums
        )
    }
}