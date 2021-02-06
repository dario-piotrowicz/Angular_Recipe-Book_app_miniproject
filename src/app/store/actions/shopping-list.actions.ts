import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../models/ingredient.model';

export const addIngredients = createAction(
  '[ShoppingListService] Add Ingredients',
  props<{ ingredients: Ingredient[] }>()
);
