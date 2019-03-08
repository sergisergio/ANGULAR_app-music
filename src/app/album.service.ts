import { Injectable } from '@angular/core';

import { Album, List } from './album';
import { Subject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';
import * as firebase from 'firebase';

const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
    })
};

@Injectable({
    providedIn: 'root'
})
export class AlbumService {
    private albumsUrl = 'https://app-music-4f48e.firebaseio.com/albums';
    private albumListsUrl = 'https://app-music-4f48e.firebaseio.com/albumLists';

    sendCurrentNumberPage = new Subject<number>(); // pour mettre à jour la pagination
    subjectAlbum = new Subject<Album>();

    constructor(private http: HttpClient) { }

    getAlbums(): Observable<Album[]> {

        // Vous devez faire le mapping avant la récupération des données
        return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
            // Préparation des données pour avoir un format exploitable dans l'application
            map(albums => _.values(albums)),
            // Ordonner les albums par ordre de durée décroissante
            map(albums => {
                return albums.sort(
                    (a, b) => { return b.duration - a.duration }
                );
            })
        )
    }

    getAlbum(id: string): Observable<Album> {

        return this.http.get<Album>(this.albumsUrl + `/${id}/.json`).pipe(
            map(album => album)
        );
    }

    getAlbumList(id: string): Observable<List> {

        return this.http.get<List>(this.albumListsUrl + `/${id}/.json`);
    }

    // retourne le nombre d'albums en base de données
    count(): Observable<number> {

        return this.http.get<Album[]>(this.albumsUrl + '/.json').pipe(
            map(album => _.values(album)),
            map(albums => albums.length),
        );
    }

    paginate(start: number, end: number): Observable<Album[]> {

        // Vous devez faire le mapping avant la récupération des données
        return this.http.get<Album[]>(this.albumsUrl + '/.json', httpOptions).pipe(
            // Préparation des données pour avoir un format exploitable dans l'application
            // JSON en Array JSON
            map(albums => {
                let Albums: Album[] = [];
                _.forEach(albums, (v, k) => {
                    v.id = k;
                    Albums.push(v);
                });

                return Albums;
            }),
            // Ordonner les albums par ordre de durée décroissante
            map(albums => {
                return albums.sort(
                    (a, b) => { return b.duration - a.duration }
                ).slice(start, end); // slicing des données
            })
        )
    }

    search(word: string): Observable<Album[]> {

        return this.http.get<Album[]>(this.albumsUrl + `/.json`).pipe(
            map(albums => {
                let search: Album[] = [];
                let re = new RegExp('^' + word.trim())
                _.forEach(albums, (v, k) => {
                    v.id = k;
                    if (v.title.match(re) != null) search.push(v);
                })

                return search;
            })
        );
    }

    currentPage(page: number) {
        return this.sendCurrentNumberPage.next(page);
    }

    switchOn(album: Album): void {
        album.status = 'on';
        // le code ici s'exécute car souscription
        this.http.put<void>(this.albumsUrl + `/${album.id}/.json`, album).subscribe(
            e => e,
            error => console.warn(error),
            () => {
                this.subjectAlbum.next(album);
            }
        );
    }

    switchOff(album: Album): void {
        album.status = 'off';
        this.http.put<void>(this.albumsUrl + `/${album.id}/.json`, album).subscribe(() => {
        });
    }

    addAlbum(album: Album): Observable<any> {
        return this.http.post<void>(this.albumsUrl + '/.json', album);
    }

    updateAlbum(ref: string, album: Album): Observable<void> {
        console.log(ref);
        return this.http.put<void>(this.albumsUrl + `/${ref}/.json`, album);
    }

    deleteAlbum(id: string): Observable<void> {
        return this.http.delete<void>(this.albumsUrl + `/${id}/.json`);
    }

    uploadFile(file: File) {

        const randomId = Math.random().toString(36).substring(2);
        const ref = firebase.app().storage("gs://app-music-4f48e.appspot.com").ref();
        const imagesRef = ref.child('images');

        return imagesRef.child(randomId + '.png').put(file);

    }

}