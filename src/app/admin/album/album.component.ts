import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../../album.service';
import { Router } from '@angular/router';

@Component({
selector: 'app-album',
templateUrl: './album.component.html',
styleUrls: ['./album.component.scss']
})
export class AlbumComponent implements OnInit {

albums;
perPage: number = 5;
message: string;
count;
showModal: boolean = false;
albumId;

constructor(
    private aS: AlbumService,
    private router: Router

  ) { }

  ngOnInit() {
    // on récupère les albums directement comme ci-dessous, dans le template on utilisera le pipe async
    // pour récupérer les albums :
    this.albums = this.aS.paginate(0, 5);
    this.count = this.aS.count();

  }

  paginate($event) {
    this.albums = this.aS.paginate($event.start, $event.end);
  }

  destroy(id: number) {
    // routerLink="/admin/delete/{{album.id}}/deleted"
    this.showModal = true;
    this.albumId = id;
  }

  choice($event) {
    this.showModal = $event.showModal;


  }


  yes() {
    this.showModal = false;
    this.router.navigate([
      '/admin/delete/' + this.albumId + '/deleted'
    ], { queryParams: { message: 'Success' } }
    );

  }

  no() {
    this.showModal = false;
  }
}
