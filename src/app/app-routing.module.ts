import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumComponent } from './admin/album/album.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { SigninComponent } from './auth/signin/signin.component';
import { SignupComponent } from './auth/signup/signup.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService} from './services/guard.service';

const routes: Routes = [
    {
      path: 'albums',
      component: AlbumsComponent
    },
    {
      path: 'auth/signin',
      component: SigninComponent
    },
    {
      path: 'auth/signup',
      component: SignupComponent
    },
    {
      path: '',
      redirectTo: '/albums',
      pathMatch: 'full'
    },
    {
      path: 'album/:id',
      component: AlbumDescriptionComponent
    },
    {
        path: 'admin', canActivate: [GuardService],
        component: AlbumComponent
    },
    {
      path: 'not-found',
      component: FourOhFourComponent
    },
    {
      path: '**',
      redirectTo: 'not-found'
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
