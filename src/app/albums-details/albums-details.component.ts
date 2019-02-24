import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Album } from '../album';
import { AlbumList } from '../album-list';
import { AlbumService } from '../album.service';

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
  songs: AlbumList;

  selectedSong: string;
  selectSong(song: string) { this.selectedSong = song; }

  private readonly newProperty = this;

  constructor(private albumService: AlbumService) { }

  ngOnInit() {
  }

  ngOnChanges() {
    //console.log(this.album); // contrôler que les données rentrent bien ici
    if (this.album) {
      this.songs = this.albumService.getAlbumList(this.album.id);
      //console.log(this.songs);
      if (this.songs) {
        this.selectedSong = this.songs.list[0];
        //console.log(this.selectedSong);
      }
    }
  }

  play(album: Album) {
    this.onPlay.emit(album); // émettre un album vers le parent
  }
}
