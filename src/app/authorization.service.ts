import { HttpEvent, HttpHandler, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService {

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = localStorage.getItem('bookie-token')
    if (token) {
      let clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + token)
      })
      return next.handle(clonedReq)
    }
    else {
      return next.handle(req)
    }
  }
}
