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
  on(ShoppingListActions.addIngredients, (state, { ingredients }) => ({
    ...state,
    ingredientsList: [...state.ingredientsList, ...ingredients],
  })),
  on(ShoppingListActions.updateIngredientAt, (state, { index, ingredient }) => {
    const ingredientsList =
      index >= 0 && index < state.ingredientsList.length
        ? [
            ...state.ingredientsList.slice(0, index),
            { ...ingredient },
            ...state.ingredientsList.slice(index + 1),
          ]
        : state.ingredientsList;
    return {
      ...state,
      ingredientsList,
    };
  }),
  on(ShoppingListActions.deleteIngredientAt, (state, { index }) => ({
    ...state,
    ingredientsList: state.ingredientsList.filter((_, idx) => idx !== index),
  }))
);

export function shoppingListReducer(state: ShoppingListState, action: Action) {
  return _shoppingListReducer(state, action);
}
