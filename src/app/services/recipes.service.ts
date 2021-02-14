import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';

import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';

import { selectRecipes } from '../store/selectors/recipes.selectors';

import { Recipe } from '../models/recipe.model';
import {
  addRecipe,
  deleteRecipe,
  resetRecipes,
  updateRecipe,
  loadRecipes,
  saveRecipes,
} from '../store/actions/recipes.actions';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  constructor(private store: Store) {}

  public getRecipes(): Observable<Recipe[]> {
    return this.store.select(selectRecipes);
  }

  public setRecipes(recipes: Recipe[]): void {
    this.store.dispatch(resetRecipes({ recipes }));
  }

  public getRecipeById(id: string): Observable<Recipe> {
    return this.store.select(selectRecipes).pipe(
      take(1),
      map((recipes) => {
        const recipe = recipes.find((recipe) => recipe.id === id);
        return recipe ? { ...recipe } : null;
      })
    );
  }

  public addRecipe(recipe: Recipe): void {
    this.store.dispatch(addRecipe({ recipe }));
  }

  public updateRecipe(recipeId: string, recipe: Recipe): void {
    this.store.dispatch(updateRecipe({ recipeId, recipe }));
  }

  public deleteRecipe(recipeId: string): void {
    this.store.dispatch(deleteRecipe({ recipeId }));
  }

  public loadRecipes(): void {
    this.store.dispatch(loadRecipes());
  }

  public saveRecipes(): void {
    this.store.dispatch(saveRecipes());
  }
}
