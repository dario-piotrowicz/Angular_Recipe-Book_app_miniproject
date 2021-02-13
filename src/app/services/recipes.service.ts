import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { selectRecipes } from '../store/selectors/recipes.selectors';

import { Recipe } from '../models/recipe.model';
import { resetRecipes } from '../store/actions/recipes.actions';
import { map, take } from 'rxjs/operators';

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
    // this._recipes.push({ ...recipe });
    // this._recipesListChanged.next();
  }

  public updateRecipe(recipeId: string, recipe: Recipe): void {
    // const recipeIdx = this._recipes.findIndex(
    //   (recipe) => recipe.id === recipeId
    // );
    // if (recipeIdx >= 0) {
    //   this._recipes[recipeIdx] = { ...recipe };
    //   this._recipesListChanged.next();
    // }
  }

  public deleteRecipe(recipeId: string): void {
    // const recipeIdx = this._recipes.findIndex(
    //   (recipe) => recipe.id === recipeId
    // );
    // if (recipeIdx >= 0) {
    //   this._recipes.splice(recipeIdx, 1);
    //   this._recipesListChanged.next();
    // }
  }
}
