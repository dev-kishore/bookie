import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  movie = new BehaviorSubject(null);

  bookTicket(ticket: any): Observable<any> {
    return this.http.post(environment.baseUrl + "user/ticket/book", ticket)
  }


}
