import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';

import { AuthService } from './auth.service';
import { switchMap, take } from 'rxjs/operators';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private authService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.authenticatedUser.pipe(
      take(1),
      switchMap((user) => {
        let params = new HttpParams();
        if (user) {
          params = params.set('auth', user.authToken);
        }
        const modifiedRequest = request.clone({ params });
        return next.handle(modifiedRequest);
      })
    );
  }
}
