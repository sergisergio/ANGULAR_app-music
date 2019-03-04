import { Injectable } from '@angular/core';
import { Album } from './album';
import { AlbumList } from './album-list';
import { environment } from '../environments/environment';
import { Subject, Observable } from 'rxjs';

// Service et classe utile
import { HttpClient, HttpHeaders } from '@angular/common/http';
// Opérateurs de RxJS
import { map } from 'rxjs/operators';
// libraire utile pour le traitement de données
import * as _ from 'lodash';

// définition des headers
const httpOptions = {
headers: new HttpHeaders({
      'Content-Type': 'application/json',
  })
};

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  //private _albums: Album[];
  //private _albumLists: AlbumList[];

  // convention dans l'API ajoutez votre identifant de base de données
  private albumsUrl = 'https://app-music-4f48e.firebaseio.com/albums';
  private albumListsUrl = 'https://app-music-4f48e.firebaseio.com/albumLists';


  sendCurrentNumberPage = new Subject<number>(); // pour mettre à jour la pagination
  subjectAlbum = new Subject<Album>();

  constructor(private http: HttpClient) { }



  getAlbums(): Observable<Album[]> {
    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
      // Préparation des données avec _.values pour avoir un format exploitable dans l'application => Array de values JSON
      map(albums => _.values(albums)),
      // Ordonnez les albums par ordre de durées décroissantes
      map(albums => {
        return albums.sort(
          (a, b) => { return b.duration - a.duration }
        );
      })
    )
  }
  getAlbum( id: string): Observable<Album> {
    // URL/ID/.json pour récupérer un album
    return this.http.get<Album>(this.albumsUrl + `/${id}/.json`).pipe(
      map(album => album) // JSON
    );
  }

  // recherche d'une référence dans la liste
  getAlbumList( id : string): Observable<AlbumList> {
    return this.http.get<AlbumList>(this.albumsUrl + `/${id}/.json`);
  }

  count(): Observable<number> {

    return this.http.get<Album[]>(this.albumsUrl +  '/.json', httpOptions).pipe(
      map(albumNbr => _.values(albumNbr)),
      map(album => album.length
    ))
    ;
  }

  paginate(start: number, end: number): Observable<Album[]> {

    return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(map(
      albums => {
        let Albums: Album[] = [];
        _.forEach(albums, (v,k) =>
          {
            v.id = k;
            Albums.push(v);
          }

        ); return Albums
      }),
      map( albums =>
        {
          return albums.sort(
            (a, b) => { return b.duration - a.duration }
            ).slice(start, end);

        })

)
}

    search(word : string): Observable<Album[]>
      {
        return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
            map(albumList => {
              //Préparation tableau vide dans lequel on va pusher ensuite les matchq
              let search: Album[] = [];
              //Préparation du word récupéré de l'input // trim retire les espaces en début et fin de chaine
              let response = new RegExp('^' + word.trim())
              //
              _.forEach(albumList, (v,k) => {
                // v.id =
                v.id = k;
                if(v.title.match(response) != null) search.push(v);
              })
              return search;
            })
    )
    }

  paginateNumberPage():number{
    if ( typeof environment.numberPage == 'undefined' )
      throw "Attention la pagination n'est pas définie" ;

    return environment.numberPage ;
  }

  currentPage(page: number) {
    return this.sendCurrentNumberPage.next(page);
  }

  switchOn(album: Album){
    album.status = 'on';
    this.http.put(this.albumsUrl + '/${album.id}/.json', album).subscribe(
      e => e,
      error => console.warn(error),
      () => {
        this.subjectAlbum.next(album);
      }
    )


    }

    switchOff(album: Album){
        album.status = 'off';
        this.http.put(this.albumsUrl + '/${album.id}/.json', album).subscribe(
          e => e,
          error => console.warn(error),
    )
    }
}
