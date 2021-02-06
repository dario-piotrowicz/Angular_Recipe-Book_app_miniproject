import { Action, createReducer, on } from '@ngrx/store';

import * as ShoppingListActions from '../actions/shopping-list.actions';

import { ShoppingListState } from '../states';
import { Ingredient } from '../../models/ingredient.model';

const initialState: ShoppingListState = {
  ingredientsList: [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ],
};

const _shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredient, (state, { ingredient }) => ({
    ...state,
    ingredientsList: [...state.ingredientsList, ingredient],
  }))
);

export function shoppingListReducer(state: ShoppingListState, action: Action) {
  return _shoppingListReducer(state, action);
}
