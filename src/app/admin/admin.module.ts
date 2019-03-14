import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumComponent } from './album/album.component';
import { ShareModule } from '../share/share.module';
import { AddAlbumComponent } from './add-album/add-album.component';
import { Routes, RouterModule } from '@angular/router';
import { GuardService } from '../services/guard.service';
import { UpdateAlbumComponent } from './update-album/update-album.component';
import { DeleteAlbumComponent } from './delete-album/delete-album.component';
import { ModalDialogComponent } from './modal-dialog/modal-dialog.component';

const routes: Routes = [
{ path: 'admin/add', component: AddAlbumComponent },
{ path: 'admin/update/:id', /*canActivate: [GuardService],*/ component: UpdateAlbumComponent },
{ path: 'admin/delete/:id/:action',/*canActivate: [GuardService],*/ component: DeleteAlbumComponent },
]

@NgModule({
  declarations: [AlbumComponent, AddAlbumComponent, UpdateAlbumComponent, DeleteAlbumComponent, ModalDialogComponent],
  imports: [
    CommonModule,
    ShareModule,
    RouterModule.forChild(routes)
  ],
  exports: [AlbumComponent]
})

export class AdminModule { }
