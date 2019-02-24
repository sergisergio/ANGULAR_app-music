import { Component, OnInit } from '@angular/core';

// Importez la définition de la classe et les albums
import { Album } from '../album';
import { AlbumService } from '../album.service';
import { PagerService } from '../pager.service';

@Component({
  selector: 'app-albums',
  templateUrl: './albums.component.html',
  styleUrls: ['./albums.component.scss']
})
export class AlbumsComponent implements OnInit {
  titlePage: string = "Page principale Albums Music";
  selectedAlbum: Album/* = this.albums[0]*/;
  status: string = null; // pour gérer l'affichage des caractères [play]

  private pageSize = 10;
  private maxTotalPageShow = 3;
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];

  constructor(
    private albumService: AlbumService,
    private pagerService: PagerService
  ) {
    // contrôle de la méthode count
    //console.log(this.ablumService.count)
  }

  ngOnInit() {
    if (this.albumService.count() > 0) {
      this.selectedAlbum = this.albumService.getAlbums()[0];
    }
    //console.log(this.albumService.count());
    // initialize to page 1
    this.pagerService.setPageSize(this.pageSize);
    this.pagerService.setMaxTotalPageShow(this.maxTotalPageShow);
    this.setPage(1);
  }

  onSelect(album: Album) {
    //console.log(album);
    this.selectedAlbum = album;
  }

  playParent($event){
    this.status = $event.id; // identifiant unique
    console.log($event)
  }

  setPage(page: number) {
    // get pager object from service
    this.pager = this.pagerService.getPager(this.albumService.count(), page);
    //console.log(this.pager);
    // get current page of items
    this.pagedItems = this.albumService.getAlbums().slice(this.pager.startIndex, this.pager.endIndex + 1);
    //console.log(this.pagedItems);
  }

}
