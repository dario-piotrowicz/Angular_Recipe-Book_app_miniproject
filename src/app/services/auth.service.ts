import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface AuthSignUpResponse {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
}

export interface AuthSignInResponse extends AuthSignUpResponse {
  registered: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly ApiKey = 'AIzaSyCyGRMzH8ZaO4L_A-AIXzRKkiDdsYgREcE';

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
      .pipe(
        catchError(({ error }) => {
          let errorMessage = 'An Error has occurred';
          if (error && error.error && error.error.message) {
            const firebaseErrorMessage = error.error.message;
            switch (firebaseErrorMessage) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
            }
          }
          return throwError(errorMessage);
        })
      );
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
      .pipe(
        catchError(({ error }) => {
          let errorMessage = 'An Error has occurred';
          if (error && error.error && error.error.message) {
            const firebaseErrorMessage = error.error.message;
            switch (firebaseErrorMessage) {
              case 'EMAIL_EXISTS':
                errorMessage = 'This email already exists';
                break;
            }
          }
          return throwError(errorMessage);
        })
      );
  }
}
