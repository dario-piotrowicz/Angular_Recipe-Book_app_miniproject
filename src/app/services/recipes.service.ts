import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Ingredient } from '../models/ingredient.model';

import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
  private _recipesListChanged = new Subject<void>();

  private _recipes: Recipe[] = [
    new Recipe(
      'egg',
      'Egg-Thinghy',
      'Something done by mixing eggs and stuff',
      'https://images.pexels.com/photos/4099123/pexels-photo-4099123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      [
        new Ingredient('eggs', 4),
        new Ingredient('glassfuls of milk', 1),
        new Ingredient('glassfuls of flour', 1),
      ]
    ),
    new Recipe(
      'yogurt',
      'Yogurt-Thingy',
      'Some type of yogurt with berries and cereals mixed in it',
      'https://images.pexels.com/photos/3872263/pexels-photo-3872263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
      [
        new Ingredient('glassfuls of yogurt', 1),
        new Ingredient('spoonfuls of dried berries', 3),
        new Ingredient('spoonfuls of cereals', 2),
      ]
    ),
  ];

  constructor() {}

  public get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  public set recipes(recipes: Recipe[]) {
    this._recipes = recipes.slice();
    this._recipesListChanged.next();
  }

  public getRecipeById(id: string): Recipe {
    const recipe = this._recipes.find((recipe) => recipe.id === id);
    return recipe ? { ...recipe } : null;
  }

  public get onRecipesListChanged(): Observable<void> {
    return this._recipesListChanged.asObservable();
  }

  public addRecipe(recipe: Recipe): void {
    this._recipes.push({ ...recipe });
    this._recipesListChanged.next();
  }

  public updateRecipe(recipeId: string, recipe: Recipe): void {
    const recipeIdx = this._recipes.findIndex(
      (recipe) => recipe.id === recipeId
    );
    if (recipeIdx >= 0) {
      this._recipes[recipeIdx] = { ...recipe };
      this._recipesListChanged.next();
    }
  }

  public deleteRecipe(recipeId: string): void {
    const recipeIdx = this._recipes.findIndex(
      (recipe) => recipe.id === recipeId
    );
    if (recipeIdx >= 0) {
      this._recipes.splice(recipeIdx, 1);
      this._recipesListChanged.next();
    }
  }
}
