import { Injectable } from '@angular/core';
import { Album } from './album';
import { AlbumList } from './album-list';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {
  albums: Album[] = ALBUMS;
  albumLists: AlbumList[] = ALBUM_LISTS;

  constructor() { }
  count() {
    return this.albums.length;
  }
  getAlbums(): Album[] {
    return this.albums;
  }
  getAlbum( id: string): Album {
    return this.albums.find(elem => elem.id === id);
  }
  getAlbumList( id : string): AlbumList {
    return this.albumLists.find(elem => elem.id === id);
  }
}
