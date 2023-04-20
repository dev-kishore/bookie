import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './user.component';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';

const routes: Routes = [{
  path: '', component: UserComponent, children: [
    { path: 'movies', component: MoviesComponent },
    { path: 'movie', component: MovieComponent },
    { path: '', redirectTo: 'movies', pathMatch: 'full' }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
