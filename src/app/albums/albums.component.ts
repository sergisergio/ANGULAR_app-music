import { Component, OnInit } from '@angular/core';

import { Album } from '../album';
import { AlbumService } from '../album.service';
import { ALBUMS } from '../mock-albums';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  titlePage: string = "Page principale Albums Music";
  albums: Album[] = ALBUMS;
  selectedAlbum: Album/* = this.albums[0]*/;
  selectedFruit: string = 'Mangue jaune';
  status: string = null; // pour gérer l'affichage des caractères [play]

  constructor(private albumService: AlbumService) {
    // contrôle de la méthode count
    console.log(this.albumService.count)
  }

  ngOnInit() {
    this.albums = this.albumService.paginate(0,5);
  }

  onSelect(album: Album) {
    //console.log(album);
    this.selectedAlbum = album;
  }

  playParent($event){
    this.status = $event.id; // identifiant unique
    console.log($event)
  }

  search($event) {
    if ($event) this.albums = $event;
  }

}
