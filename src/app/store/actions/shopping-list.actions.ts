import { createAction, props } from '@ngrx/store';
import { Ingredient } from '../../models/ingredient.model';

export const addIngredient = createAction(
  '[ShoppingListService] Add Ingredient',
  props<{ ingredient: Ingredient }>()
);
