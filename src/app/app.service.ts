import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private http: HttpClient) { }

  movies = new BehaviorSubject(null)

  username: string = ''

  loginStatus: boolean = false

  searchMovie(query: string): Observable<any> {
    return this.http.get(environment.baseUrl + `user/movie/get?query=${query}`)
  }

  getSearchSuggestions(query: string): Observable<any> {
    return this.http.get(environment.baseUrl + `user/movie/search?query=${query}`)
  }

  getMovies(page: string): Observable<any> {
    return this.http.get(environment.baseUrl + `user/movies/get?page=${page}&size=8`)
  }
}
