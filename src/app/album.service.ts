import { Injectable } from '@angular/core';
import { Album } from './album';
import { AlbumList } from './album-list';
import { ALBUMS, ALBUM_LISTS } from './mock-albums';
import { environment } from '../environments/environment';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  private _albums: Album[] = ALBUMS;
  private _albumLists: AlbumList[] = ALBUM_LISTS;

  sendCurrentNumberPage = new Subject<number>(); // pour mettre à jour la pagination
  subjectAlbum = new Subject<Album>();

  constructor() { }



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

  count(): number {
    return this._albums.length;
  }

  paginate(start: number, end: number):Album[]{

    // utilisez la méthode slice pour la pagination
    return this._albums.sort(
      (a, b) => { return b.duration - a.duration }
    ).slice(start, end);
  }

  search(word: string): Album[] {
    /*if (word.length > 2) {
      let response = [];
      this._albums.forEach(album => {
        if (album.title.includes(word)) response.push(album);
      });

      return response;
    }*/

    let re = new RegExp(word.trim(), 'g');

    // filter permet de filter un tableau avec un test dans le test ci-dessous on vérifie
    // deux choses : 1/ que album.title.match(re) n'est pas vide si c'est le contraire alors c'est pas faux
    // et 2/ si on a trouver des titres qui matchaient/t avec la recherche
    return this._albums.filter(album => album.title.match(re) && album.title.match(re).length > 0) ;
  }

  paginateNumberPage():number{
    if ( typeof environment.numberPage == 'undefined' )
      throw "Attention la pagination n'est pas définie" ;

    return environment.numberPage ;
  }

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  switchOn(album: Album) {

    this._albums.forEach(
      a => {
        if (a.id === album.id) album.status = 'on';
        else
          a.status = 'off';
      }
    );

    this.subjectAlbum.next(album); // Observer puscher les informations
  }

  // Cette méthode n'a pas besoin d'émettre une information à l'Observable
  switchOff(album: Album) {
    this._albums.forEach(
      a => {
        a.status = 'off';
      }
    );
  }
}
