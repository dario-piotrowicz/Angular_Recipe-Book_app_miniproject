import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as AuthActions from '../actions/auth.actions';

import {
  AuthSignInResponse,
  AuthSignUpResponse,
} from '../../models/auth-response.model';
import { User } from '../../models/user.model';

@Injectable()
export class AuthEffects {
  private readonly ApiKey = 'AIzaSyCyGRMzH8ZaO4L_A-AIXzRKkiDdsYgREcE';

  constructor(private actions: Actions, private http: HttpClient) {}

  signIn = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.singInRequestStart),
      switchMap(({ email, password }) =>
        this.http
          .post<AuthSignInResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.ApiKey}`,
            {
              email,
              password,
              returnSecureToken: true,
            }
          )
          .pipe(catchError((error) => of({ error })))
      ),
      map((response: AuthSignInResponse | { error: any }) => {
        const error = (response as { error: any }).error;
        if (error) {
          const errorMessage = this.createErrorMessageFromFirebaseError(error);
          return AuthActions.singInRequestError({ errorMessage });
        }

        const user = this.createUserFromAuthSingInOrSignUpResponse(
          response as AuthSignInResponse
        );
        return AuthActions.logIn({ user });
      })
    )
  );

  signUp = createEffect(() =>
    this.actions.pipe(
      ofType(AuthActions.singUpRequestStart),
      switchMap(({ email, password }) =>
        this.http
          .post<AuthSignUpResponse>(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.ApiKey}`,
            {
              email,
              password,
              returnSecureToken: true,
            }
          )
          .pipe(catchError((error) => of({ error })))
      ),
      map((response: AuthSignUpResponse | { error: any }) => {
        const error = (response as { error: any }).error;
        if (error) {
          const errorMessage = this.createErrorMessageFromFirebaseError(error);
          return AuthActions.singInRequestError({ errorMessage });
        }

        const user = this.createUserFromAuthSingInOrSignUpResponse(
          response as AuthSignUpResponse
        );
        return AuthActions.logIn({ user });
      })
    )
  );

  private createUserFromAuthSingInOrSignUpResponse(
    response: AuthSignInResponse | AuthSignUpResponse
  ): User {
    const {
      localId: id,
      email,
      idToken: token,
      expiresIn,
    } = response as AuthSignInResponse;

    const currentTimeInMillis = new Date().getTime();
    const expiresInInMillis = parseInt(expiresIn) * 1000;
    const expirationDate = new Date(currentTimeInMillis + expiresInInMillis);

    return new User(id, email, token, expirationDate);
  }

  private createErrorMessageFromFirebaseError({ error }): string {
    let errorMessage = 'An Error has occurred';
    if (error && error.error && error.error.message) {
      const rawFirebaseErrorMessage: string = error.error.message || '';
      const firebaseErrorMessage = rawFirebaseErrorMessage.split(' ')[0];
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
        case 'TOO_MANY_ATTEMPTS_TRY_LATER':
          errorMessage = 'Too many attempts, please try later';
          break;
      }
    }
    return errorMessage;
  }
}
