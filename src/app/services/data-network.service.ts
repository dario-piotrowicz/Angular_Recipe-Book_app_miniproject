import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipesService } from './recipes.service';
import { Recipe } from '../models/recipe.model';

@Injectable({
  providedIn: 'root',
})
export class DataNetworkService {
  private readonly firebaseRealtimeDatabaseUrl =
    'https://angular-recipe-book-app-be-default-rtdb.firebaseio.com';

  private readonly firebaseRecipesUrl = `${this.firebaseRealtimeDatabaseUrl}/recipes.json`;

  constructor(
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}

  public saveRecipes(): void {
    const recipes = this.recipesService.recipes;
    this.http.put(this.firebaseRecipesUrl, recipes).subscribe(() => {});
  }

  public loadRecipes(): void {
    this.http.get<Recipe[]>(this.firebaseRecipesUrl).subscribe((recipes) => {
      this.recipesService.recipes = recipes;
    });
  }
}
