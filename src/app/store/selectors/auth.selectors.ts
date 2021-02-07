import { createSelector } from '@ngrx/store';
import { AppState, AuthState } from '../states';

export const selectAuth = (state: AppState) => state.auth;

export const selectUser = createSelector(
  selectAuth,
  (Auth: AuthState) => Auth.user
);
