import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './albums-details/albums-details.component';
import { RouterModule, Routes } from '@angular/router';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { AuthComponent } from './auth/auth.component';
import { AuthService } from './services/auth.service';
import { SearchComponent } from './search/search.component';
import { FruitsComponent } from './fruits/fruits.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { PaginateComponent } from './paginate/paginate.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

const appRoutes: Routes = [
  { path: 'albums', component: AlbumsComponent },
  { path: '', redirectTo: '/albums', pathMatch: 'full' },
  { path: 'auth', component: AuthComponent },
  { path: 'album/:id', component: AlbumDescriptionComponent },
  { path: 'not-found', component: FourOhFourComponent },
  { path: '**', redirectTo: 'not-found' }
];

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    FourOhFourComponent,
    AuthComponent,
    SearchComponent,
    FruitsComponent,
    AlbumDescriptionComponent,
    PaginateComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [,
      AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
