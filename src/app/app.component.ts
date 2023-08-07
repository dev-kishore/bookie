import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  
  title = 'bookie';

  movieSuggestions: string[] = []

  searchTerm: string = ""

  constructor(public appService: AppService, private router: Router) {}

  ngOnInit(): void {
    localStorage.removeItem('bookie-token')
  }

  logout() {
    localStorage.removeItem('bookie-token')
    this.appService.loginStatus = false
    this.appService.username = ""
    this.router.navigateByUrl('app/user/movies')
  }

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
          console.log(error)
        }
      })
    } else {
      this.appService.getMovies("0").subscribe({
        next: (response) => {
          this.appService.movies.next(response)
        },
        error: (error) => {
          console.log(error)
        }
      })
    }
    this.router.navigateByUrl("app/user/movies")
  }
  
}
