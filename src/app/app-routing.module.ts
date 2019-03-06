import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AlbumsComponent } from './albums/albums.component';
import { AlbumDescriptionComponent } from './album-description/album-description.component';
import { AuthComponent } from './auth/auth.component';
import { FourOhFourComponent } from './four-oh-four/four-oh-four.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { GuardService} from './services/guard.service';

const routes: Routes = [
    {
      path: 'albums',
      component: AlbumsComponent
    },
    {
      path: 'auth',
      component: AuthComponent
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
      path: 'not-found',
      component: FourOhFourComponent
    },
    {
      path: '**',
      redirectTo: 'not-found'
    },
    {
      path: 'dashboard',
      canActivate: [GuardService],
      component: DashboardComponent
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
