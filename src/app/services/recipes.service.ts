import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';

import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class RecipesService {
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

  public getRecipeById(id: string): Recipe {
    const recipe = this._recipes.find((recipe) => recipe.id === id);
    return recipe ? { ...recipe } : null;
  }
}
