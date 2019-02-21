import { Component, OnInit, Input } from '@angular/core';
import { Album } from '../album';

@Component({
  selector: 'app-albums-details',
  templateUrl: './albums-details.component.html',
  styleUrls: ['./albums-details.component.scss']
})
export class AlbumsDetailsComponent implements OnInit {
  @Input() album: Album;

  constructor() { }

  ngOnInit() {
      console.log(this.album); // contrôler que les données rentrent bien ici
  }

}
