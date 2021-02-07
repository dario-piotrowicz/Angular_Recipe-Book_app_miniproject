import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../models/ingredient.model';

export const addIngredients = createAction(
  '[ShoppingListService] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);

export const updateIngredientAt = createAction(
  '[ShoppingListService] Update Ingredient at',
  props<{ index: number; ingredient: Ingredient }>()
);

export const deleteIngredientAt = createAction(
  '[ShoppingListService] Delete Ingredient at',
  props<{ index: number }>()
);

export const selectIngredientForEditing = createAction(
  '[ShoppingListService] Select Ingredient For Editing',
  props<{ index: number }>()
);
