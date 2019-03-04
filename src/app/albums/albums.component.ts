import { Component, OnInit } from '@angular/core';

import { Album } from '../album';
import { AlbumService } from '../album.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  titlePage: string = "Page principale Albums Music";
  albums: Album[] = [];
  selectedAlbum: Album;
  status: string = null; // pour gérer l'affichage des caractères [play]
  perPage : number = 5;

  constructor(private albumService: AlbumService) {
    // récupération des données depuis Firebase avec la méthode HttpClient
    console.log(this.albumService.count());
  }

  ngOnInit() {
    this.albumService.paginate(0,5).subscribe(albums => this.albums = albums)  }

  onSelect(album: Album) {
    //console.log(album);
    this.selectedAlbum = album;
  }

  playParent($event){
    this.status = $event.id; // identifiant unique
    console.log($event)
    this.albumService.switchOn($event);
  }

  search($event) {
    console.log($event);
    if ($event) this.albums = $event;
  }

  // mise à jour de la pagination
  paginate($event) {
    this.albumService.paginate($event.start, $event.end).subscribe(albums => this.albums = albums);
  }

}
