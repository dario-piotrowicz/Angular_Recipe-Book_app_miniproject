import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

import {
  AuthSignInResponse,
  AuthSignUpResponse,
} from '../models/auth-response.model';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ApiKey = 'AIzaSyCyGRMzH8ZaO4L_A-AIXzRKkiDdsYgREcE';

  private _authenticatedUser = new BehaviorSubject<User>(null);

  public get authenticatedUser(): Observable<User> {
    return this._authenticatedUser.asObservable();
  }

  constructor(private http: HttpClient) {}

  public signUp(
    email: string,
    password: string
  ): Observable<AuthSignUpResponse> {
    return this.http
      .post<AuthSignUpResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.ApiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(this.handleAuthSignInOrSignUpError, this.saveAuthenticatedUser);
  }

  public signIn(
    email: string,
    password: string
  ): Observable<AuthSignInResponse> {
    return this.http
      .post<AuthSignInResponse>(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.ApiKey}`,
        {
          email,
          password,
          returnSecureToken: true,
        }
      )
      .pipe(this.handleAuthSignInOrSignUpError, this.saveAuthenticatedUser);
  }

  private handleAuthSignInOrSignUpError<T>(
    source: Observable<T>
  ): Observable<T> {
    return source.pipe(
      catchError(({ error }) => {
        let errorMessage = 'An Error has occurred';
        if (error && error.error && error.error.message) {
          const firebaseErrorMessage = error.error.message;
          switch (firebaseErrorMessage) {
            case 'EMAIL_EXISTS':
              errorMessage = 'This email already exists';
              break;
            case 'EMAIL_NOT_FOUND':
              errorMessage = 'This email does not exist';
              break;
            case 'INVALID_PASSWORD':
              errorMessage = 'The provided password is incorrect';
              break;
          }
        }
        this._authenticatedUser.next(null);
        return throwError(errorMessage);
      })
    );
  }

  private saveAuthenticatedUser = <
    T extends AuthSignInResponse | AuthSignUpResponse
  >(
    source: Observable<T>
  ): Observable<T> => {
    return source.pipe(
      tap((response) => {
        const { localId: id, email, idToken: token, expiresIn } = response;

        const currentTimeInMillis = new Date().getTime();
        const expiredInInMillis = parseInt(expiresIn) * 1000;
        const expirationDate = new Date(
          currentTimeInMillis + expiredInInMillis
        );

        this._authenticatedUser.next(
          new User(id, email, token, expirationDate)
        );
      })
    );
  };
}
