import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  register(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/register", data)
  }

  login(data: any): Observable<any> {
    return this.http.post(environment.baseUrl + "auth/login", data)
  }

  resetPassword(username: string, password: any):Observable<any> {
    return this.http.put(environment.baseUrl + `auth/${username}/forgot`, password)
  }
  
}
