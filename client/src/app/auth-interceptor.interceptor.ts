import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {


  constructor(private authService: AuthService) {}
    intercept(
      request: HttpRequest<any>,
      next: HttpHandler
    ): Observable<HttpEvent<any>> {
  
      const token = this.authService.getToken();
      console.log(token);
      if (request.url.includes("login") || request.url.includes("register")) {
        return next.handle(request);
      }
  
      if (token) {
        console.log("in what we want");
        request = request.clone({
          setHeaders: {
            "Content-Type": "application/json; charset=utf-8",
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }
        return next.handle(request);
    }
}
