import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-movies',
  templateUrl: './movies.component.html',
  styleUrls: ['./movies.component.scss']
})
export class MoviesComponent implements OnInit {

  constructor(private appService: AppService, private userService: UserService,private router: Router) { }

  movies: any[] = []

  initialPage: string = ""

  loading = true

  ngOnInit(): void {
    this.initialPage = "0"
    this.fetchMovies(this.initialPage);
    this.appService.movies.subscribe(movies => this.movies = movies !== null ? movies : this.movies)
  }

  pageChange(page: number) {
    this.fetchMovies(page.toString())
  }

  viewMovie(movie: any) {
    this.userService.movie.next(movie)
    this.router.navigateByUrl("app/user/movie")
  }

  fetchMovies(page: string) {
    this.appService.getMovies(page).subscribe({
      next: (response) => {
        this.appService.movies.next(response)
      },
      error: (error) => {
        console.log(error)
      }
    })
  }

}
