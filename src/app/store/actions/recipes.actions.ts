import { createAction, props } from '@ngrx/store';
import { Recipe } from '../../models/recipe.model';

export const resetRecipes = createAction(
  '[RecipesService] Reset Recipes',
  props<{ recipes: Recipe[] }>()
);

export const addRecipe = createAction(
  '[RecipesService] Add Recipe',
  props<{ recipe: Recipe }>()
);

export const updateRecipe = createAction(
  '[RecipesService] Update Recipe',
  props<{ recipeId: string; recipe: Recipe }>()
);

export const deleteRecipe = createAction(
  '[RecipesService] Delete Recipe',
  props<{ recipeId: string }>()
);
