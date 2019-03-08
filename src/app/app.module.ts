import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AdminModule } from './admin/admin.module';
import { ShareModule } from './share/share.module';

import * as firebase from 'firebase';

import { AppComponent } from './app.component';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDetailsComponent } from './albums-details/albums-details.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { AuthService } from './services/auth.service';
import { GuardService } from './services/guard.service';
import { SearchComponent } from './search/search.component';
import { FruitsComponent } from './fruits/fruits.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AudioPlayerComponent } from './audioplayer/audioplayer.component';
import { DashboardComponent } from './dashboard/dashboard.component';

// Initialize Firebase
const config = {
apiKey: "AIzaSyCZLk_vN6_LdI2_d3cy4Ic_v4dFqrrPAi4",
authDomain: "app-music-4f48e.firebaseapp.com",
databaseURL: "https://app-music-4f48e.firebaseio.com",
projectId: "app-music-4f48e",
storageBucket: "app-music-4f48e.appspot.com",
messagingSenderId: "631336373980"
};
firebase.initializeApp(config);

@NgModule({
  declarations: [
    AppComponent,
    AlbumsComponent,
    AlbumDetailsComponent,
    FourOhFourComponent,
    SigninComponent,
    SearchComponent,
    FruitsComponent,
    AlbumDescriptionComponent,
    AudioPlayerComponent,
    DashboardComponent,
    SignupComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AdminModule,
    ShareModule
  ],
  providers: [,
      AuthService,
      GuardService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
