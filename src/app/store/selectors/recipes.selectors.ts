import { createSelector } from '@ngrx/store';
import { AppState, RecipesState } from '../states';

export const selectRecipesState = (state: AppState) => state.recipes;

export const selectRecipes = createSelector(
  selectRecipesState,
  (recipesState: RecipesState) => recipesState.recipes
);
