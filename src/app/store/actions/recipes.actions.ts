import { createAction, props } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';

export const resetRecipes = createAction(
  '[RecipesService] Reset Recipes',
  props<{ recipes: Recipe[] }>()
);
