import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../album';
import { AlbumList } from '../album-list';
import { ALBUM_LISTS } from '../mock-albums';

@Component({
  selector: 'app-album-details',
  templateUrl: './albums-details.component.html',
  styleUrls: ['./albums-details.component.scss']
})
export class AlbumDetailsComponent implements OnInit {
  // Classe Input permet de récupérer les data de l'enfant
  // album est liée à une entrée [album] du parent dans le sélecteur
  @Input() album: Album;
  @Output() onPlay: EventEmitter<Album> = new EventEmitter();

  albumLists: AlbumList[] = ALBUM_LISTS; // récupération de la liste des chasons
  songs: Array<string> = [];

  constructor() { }

  ngOnInit() {
  }

  // dès que quelque chose "rentre" dans le component enfant via une propriété Input
  // ou à l'initialisation du component (une fois) cette méthode est appelée
  ngOnChanges() {
    // on vérifie que l'on a bien cliqué sur un album avant de rechercher dans la liste
    // des chansons.
    if(this.album){
    // récupération de la liste des chansons
      this.songs = this.albumLists.find(elem => elem.id === this.album.id).list;
    }

  }

  play(album: Album) {
    this.onPlay.emit(album); // émettre un album vers le parent
  }
}
