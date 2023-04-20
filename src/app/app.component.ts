import { Component } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'bookie';

  movieSuggestions: string[] = []

  constructor(public appService: AppService, private router: Router) {}

  logout() {
    localStorage.removeItem('bookie-token')
    this.appService.loginStatus = false
    this.router.navigateByUrl('app/user/movies')
  }

  searchTerm: string = ""

  getSuggestions(term: any) {
    this.appService.getSearchSuggestions(term.target.value).subscribe(res => {
      this.movieSuggestions = res
      this.movieSuggestions = this.searchTerm == "" ? [] : this.movieSuggestions
    })
  }

  searchMovie() {
    if(this.searchTerm !== "") {
      this.appService.searchMovie(this.searchTerm).subscribe({
        next: (response) => {
          this.appService.movies.next(response)
        },
        error: (error) => {
  
        }
      })
    } else {
      this.appService.getMovies("0").subscribe({
        next: (response) => {
          this.appService.movies.next(response)
        },
        error: (error) => {
  
        }
      })
    }
    this.router.navigateByUrl("app/user/movies")
  }
  
}
