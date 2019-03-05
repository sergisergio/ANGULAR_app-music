import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album, List } from '../album';

import { AlbumService } from '../album.service';

@Component({
    selector: 'app-album-details',
    templateUrl: './albums-details.component.html',
    styleUrls: ['./albums-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {

    @Input() album: Album; // propriété [album] liée
    @Output() onPlay: EventEmitter<Album> = new EventEmitter();

    songs: List;

    constructor(private aS: AlbumService) { }

    ngOnInit() { }

    // dès que quelque chose "rentre" dans le component enfant via une propriété Input
    // ou à l'initialisation du component (une fois) cette méthode est appelée
    ngOnChanges() {
        // on vérifie que l'on a bien cliqué sur un album avant de rechercher dans la liste
        // des chansons.
        if (this.album) {
            // récupération de la liste des chansons
            this.aS.getAlbumList(this.album.id).subscribe(
                songs => this.songs = songs
            );
        }
    }

    play(album: Album) {
        this.onPlay.emit(album); // émettre un album vers le parent
    }

}
