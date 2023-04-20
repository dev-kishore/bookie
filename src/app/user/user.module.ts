import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { CoreModule } from '../core/core.module';
import { MoviesComponent } from './movies/movies.component';
import { MovieComponent } from './movie/movie.component';


@NgModule({
  declarations: [
    UserComponent,
    MoviesComponent,
    MovieComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    CoreModule
  ]
})
export class UserModule { }
