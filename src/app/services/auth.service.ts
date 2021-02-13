import { Injectable } from '@angular/core';
import { Observable, Subscription, timer } from 'rxjs';
import { tap } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import {
  selectErrorMessage,
  selectLoading,
  selectUser,
} from '../store/selectors/auth.selectors';
import * as AuthActions from '../store/actions/auth.actions';

import {
  AuthSignInResponse,
  AuthSignUpResponse,
} from '../models/auth-response.model';

import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly localStorageUserKey = 'recipeBookAppUserData';

  private expirationTimerSubscription: Subscription = null;

  public get authenticatedUser(): Observable<User> {
    return this.store.select(selectUser);
  }

  constructor(private store: Store) {}

  public get isLoading(): Observable<boolean> {
    return this.store.select(selectLoading);
  }

  public get errorMessage(): Observable<string> {
    return this.store.select(selectErrorMessage);
  }

  public signIn(email: string, password: string): void {
    this.store.dispatch(AuthActions.singInRequestStart({ email, password }));
  }

  public signUp(email: string, password: string): void {
    this.store.dispatch(AuthActions.singUpRequestStart({ email, password }));
  }

  public logOut(): void {
    this.store.dispatch(AuthActions.logOut());
    localStorage.removeItem(this.localStorageUserKey);
    if (this.expirationTimerSubscription) {
      this.expirationTimerSubscription.unsubscribe();
      this.expirationTimerSubscription = null;
    }
  }

  public retrieveUserDataFromLocalStorage(): void {
    const localStorageUserData = JSON.parse(
      localStorage.getItem(this.localStorageUserKey)
    );
    if (
      localStorageUserData &&
      localStorageUserData.id &&
      localStorageUserData.email &&
      localStorageUserData._authToken &&
      localStorageUserData._authTokenExpirationDate
    ) {
      const tokenExpirationDate = new Date(
        localStorageUserData._authTokenExpirationDate
      );
      const userFromLocalStorage = new User(
        localStorageUserData.id,
        localStorageUserData.email,
        localStorageUserData._authToken,
        tokenExpirationDate
      );
      this.store.dispatch(AuthActions.logIn({ user: userFromLocalStorage }));
      const expiresInInMillis =
        tokenExpirationDate.getTime() - new Date().getTime();
      this.setExpirationTimer(expiresInInMillis);
    }
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
        const expiresInInMillis = parseInt(expiresIn) * 1000;
        const expirationDate = new Date(
          currentTimeInMillis + expiresInInMillis
        );

        const user = new User(id, email, token, expirationDate);
        this.store.dispatch(
          AuthActions.logIn({
            user: new User(id, email, token, expirationDate),
          })
        );
        localStorage.setItem(this.localStorageUserKey, JSON.stringify(user));
        this.setExpirationTimer(expiresInInMillis);
      })
    );
  };

  private setExpirationTimer(millsecondsToExpiration: number): void {
    if (this.expirationTimerSubscription) {
      this.expirationTimerSubscription.unsubscribe();
    }
    this.expirationTimerSubscription = timer(
      millsecondsToExpiration
    ).subscribe(() => this.logOut());
  }
}
