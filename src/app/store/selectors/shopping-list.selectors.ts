import { createSelector } from '@ngrx/store';
import { AppState, ShoppingListState } from '../states';

export const selectShoppingList = (state: AppState) => state.shoppingList;

export const selectIngredientsList = createSelector(
  selectShoppingList,
  (shoppingList: ShoppingListState) => shoppingList.ingredientsList
);

export const selectIndexOfIngredientSelectedForEditing = createSelector(
  selectShoppingList,
  (shoppingList: ShoppingListState) =>
    shoppingList.indexOfIngredientSelectedForEditing
);
