import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';

import { AuthState } from '../states';

const initialState: AuthState = {
  user: null,
  loading: false,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.logIn, (state, { user }) => ({
    ...state,
    user,
    loading: false,
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
    user: null,
    loading: false,
  })),
  on(AuthActions.singInRequestStart, (state) => ({
    ...state,
    errorMessage: null,
    loading: true,
  })),
  on(AuthActions.singInRequestError, (state, { errorMessage }) => ({
    ...state,
    user: null,
    errorMessage,
    loading: false,
  }))
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
