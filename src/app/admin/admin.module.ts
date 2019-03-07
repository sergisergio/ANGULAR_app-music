import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumsComponent } from '../albums/albums.component';
import { Routes, RouterModule } from '@angular/router';

const adminRoutes = [
  {
    path: 'admin',
    component: AlbumsComponent
  }
]

@NgModule({
  declarations: [AlbumsComponent],
  imports: [
    CommonModule,
    RouterModule.forRoot(adminRoutes)
  ],
  exports: [
    AlbumsComponent,
    RouterModule
  ]
})

export class AdminModule { }
