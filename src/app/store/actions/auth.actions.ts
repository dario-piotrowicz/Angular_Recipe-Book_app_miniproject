import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const singInRequestStart = createAction(
  '[AuthService] signIn Request Start',
  props<{ email: string; password: string }>()
);

export const singInRequestError = createAction(
  '[AuthService] signIn Request Error',
  props<{ errorMessage: string }>()
);

export const singUpRequestStart = createAction(
  '[AuthService] signUp Request Start',
  props<{ email: string; password: string }>()
);

export const singUpRequestError = createAction(
  '[AuthService] signUp Request Error',
  props<{ errorMessage: string }>()
);

export const logIn = createAction(
  '[AuthService] LogIn',
  props<{ user: User }>()
);

export const logOut = createAction('[AuthService] LogOut');
