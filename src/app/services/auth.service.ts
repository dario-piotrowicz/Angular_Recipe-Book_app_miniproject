import { Injectable } from '@angular/core';

import { Observable, Subscription, timer } from 'rxjs';
import { skip } from 'rxjs/operators';

import { Store } from '@ngrx/store';

import {
  selectErrorMessage,
  selectLoading,
  selectUser,
} from '../store/selectors/auth.selectors';
import * as AuthActions from '../store/actions/auth.actions';

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

  constructor(private store: Store) {
    this.store
      .select(selectUser)
      .pipe(skip(1))
      .subscribe((user) => {
        if (!user) {
          localStorage.removeItem(this.localStorageUserKey);
          if (this.expirationTimerSubscription) {
            this.expirationTimerSubscription.unsubscribe();
            this.expirationTimerSubscription = null;
          }
        } else {
          localStorage.setItem(this.localStorageUserKey, JSON.stringify(user));
          const expiresInInMillis =
            user.authTokenExpirationDate.getTime() - new Date().getTime();
          this.setExpirationTimer(expiresInInMillis);
        }
      });
  }

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
  }

  public autoLoginFromLocalStorage(): void {
    const localStorageUserData = JSON.parse(
      localStorage.getItem(this.localStorageUserKey)
    );
    if (
      localStorageUserData &&
      localStorageUserData.id &&
      localStorageUserData.email &&
      localStorageUserData._authToken &&
      localStorageUserData.authTokenExpirationDate
    ) {
      const tokenExpirationDate = new Date(
        localStorageUserData.authTokenExpirationDate
      );
      if (tokenExpirationDate.getTime() > new Date().getTime()) {
        const userFromLocalStorage = new User(
          localStorageUserData.id,
          localStorageUserData.email,
          localStorageUserData._authToken,
          tokenExpirationDate
        );
        this.store.dispatch(AuthActions.logIn({ user: userFromLocalStorage }));
      } else {
        localStorage.removeItem(this.localStorageUserKey);
      }
    }
  }

  private setExpirationTimer(millsecondsToExpiration: number): void {
    if (this.expirationTimerSubscription) {
      this.expirationTimerSubscription.unsubscribe();
    }
    this.expirationTimerSubscription = timer(
      millsecondsToExpiration
    ).subscribe(() => this.logOut());
  }
}
