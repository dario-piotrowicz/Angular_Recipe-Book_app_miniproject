import { createAction, props } from '@ngrx/store';
import { User } from '../../models/user.model';

export const logIn = createAction(
  '[AuthService] LogIn',
  props<{ user: User }>()
);

export const logOut = createAction('[AuthService] LogOut');
