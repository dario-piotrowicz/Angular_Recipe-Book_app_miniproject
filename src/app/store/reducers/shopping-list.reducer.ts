import { Action, createReducer, on } from '@ngrx/store';

import * as ShoppingListActions from '../actions/shopping-list.actions';

import { ShoppingListState } from '../states';
import { Ingredient } from '../../models/ingredient.model';

const initialState: ShoppingListState = {
  ingredientsList: [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ],
  indexOfIngredientSelectedForEditing: -1,
};

const _shoppingListReducer = createReducer(
  initialState,
  on(ShoppingListActions.addIngredients, (state, { ingredients }) => ({
    ...state,
    ingredientsList: [...state.ingredientsList, ...ingredients],
  })),
  on(ShoppingListActions.updateSelectedIngredient, (state, { ingredient }) => {
    const index = state.indexOfIngredientSelectedForEditing;
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
  on(ShoppingListActions.deleteSelectedIngredient, (state) => {
    const index = state.indexOfIngredientSelectedForEditing;
    return {
      ...state,
      ingredientsList: state.ingredientsList.filter((_, idx) => idx !== index),
      indexOfIngredientSelectedForEditing: -1,
    };
  }),
  on(ShoppingListActions.selectIngredientForEditing, (state, { index }) => ({
    ...state,
    indexOfIngredientSelectedForEditing:
      index >= 0 && index < state.ingredientsList.length ? index : -1,
  })),
  on(ShoppingListActions.unselectIngredientForEditing, (state) => ({
    ...state,
    indexOfIngredientSelectedForEditing: -1,
  }))
);

export function shoppingListReducer(state: ShoppingListState, action: Action) {
  return _shoppingListReducer(state, action);
}
