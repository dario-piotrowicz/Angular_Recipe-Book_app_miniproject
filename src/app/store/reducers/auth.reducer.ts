import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';

import { AuthState } from '../states';

const initialState: AuthState = {
  user: null,
};

const _authReducer = createReducer(
  initialState,
  on(AuthActions.logIn, (state, { user }) => ({
    ...state,
    user,
  })),
  on(AuthActions.logOut, (state) => ({
    ...state,
    user: null,
  }))
);

export function authReducer(state: AuthState, action: Action) {
  return _authReducer(state, action);
}
