import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient) { }

  addMovie(movie: any): Observable<any> {
    return this.http.post(environment.baseUrl + "admin/movie/add", movie)
  }

  deleteMovie(id: string): Observable<any> {
    return this.http.delete(environment.baseUrl + `admin/movie/delete/${id}`)
  }
  
}
