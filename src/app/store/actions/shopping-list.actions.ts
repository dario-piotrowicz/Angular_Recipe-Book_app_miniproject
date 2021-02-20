import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../models/ingredient.model';

export const addIngredients = createAction(
  '[ShoppingListService] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);

export const updateSelectedIngredient = createAction(
  '[ShoppingListService] Update Selected Ingredient',
  props<{ ingredient: Ingredient }>()
);

export const deleteSelectedIngredient = createAction(
  '[ShoppingListService] Delete Ingredient'
);

export const selectIngredientForEditing = createAction(
  '[ShoppingListService] Select Ingredient For Editing',
  props<{ index: number }>()
);

export const unselectIngredientForEditing = createAction(
  '[ShoppingListService] Unselect Ingredient For Editing'
);
