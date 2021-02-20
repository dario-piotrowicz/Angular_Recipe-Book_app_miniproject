import { createSelector } from '@ngrx/store';
import { AppState, ShoppingListState } from '../states';

export const selectShoppingList = (state: AppState) => state.shoppingList;

export const selectIngredientsList = createSelector(
  selectShoppingList,
  (shoppingList: ShoppingListState) => shoppingList.ingredientsList
);

const selectIndexOfIngredientSelectedForEditing = createSelector(
  selectShoppingList,
  (shoppingList: ShoppingListState) =>
    shoppingList.indexOfIngredientSelectedForEditing
);

export const selectSelectedIngredientForEditing = createSelector(
  selectShoppingList,
  selectIndexOfIngredientSelectedForEditing,
  (shoppingList, index) =>
    index >= 0 && index < shoppingList.ingredientsList.length
      ? { ...shoppingList.ingredientsList[index] }
      : null
);
