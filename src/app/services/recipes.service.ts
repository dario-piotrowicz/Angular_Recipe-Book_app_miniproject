import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {

  private selectedRecipeObs = new BehaviorSubject<Recipe>(null);

  private _recipes: Recipe[] = [
    new Recipe(
      'A test recipe',
      'This is simply a test',
      'https://images.pexels.com/photos/4099123/pexels-photo-4099123.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ),
    new Recipe(
      'A test recipe 2',
      'This is simply another test',
      'https://images.pexels.com/photos/3872263/pexels-photo-3872263.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260'
    ),
  ];

  constructor() { }

  public get recipes(): Recipe[] {
    return this._recipes.slice();
  }

  public get onRecipeSelected(): Observable<Recipe> {
    return this.selectedRecipeObs as Observable<Recipe>;
  }

  public selectRecipe(recipe: Recipe) {
    this.selectedRecipeObs.next({...recipe});
  }
}
