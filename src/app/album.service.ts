import { Injectable } from '@angular/core';
import { Album } from './album';
import { AlbumList } from './album-list';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albums: Album[] = ALBUMS;
  private _albumLists: AlbumList[] = ALBUM_LISTS;

  constructor() { }


  count() {
    return this._albums.length;
  }
  getAlbums(): Album[] {
    return this._albums.sort(
      (a, b) => { return b.duration - a.duration }
    );
  }
  getAlbum( id: string): Album {
    return this._albums.find(elem => elem.id === id);
  }

  // recherche d'une référence dans la liste
  getAlbumList( id : string): AlbumList {
    return this._albumLists.find(elem => elem.id === id);
  }

  paginate(start: number, end: number):Album[]{

    // utilisez la méthode slice pour la pagination
    return this._albums.sort(
      (a, b) => { return b.duration - a.duration }
    ).slice(start, end);
  }

  search(word: string): Album[] {
    if (word.length > 2) {
      let response = [];
      this._albums.forEach(album => {
        if (album.title.includes(word)) response.push(album);
      });

      return response;
    }
  }

  paginateNumberPage():number{
    if ( typeof environment.numberPage == 'undefined' )
      throw "Attention la pagination n'est pas définie" ;

    return environment.numberPage ;
  }
}
