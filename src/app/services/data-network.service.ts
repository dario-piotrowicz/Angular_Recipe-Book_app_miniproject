import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { map, switchMap, take } from 'rxjs/operators';

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
    this.recipesService
      .getRecipes()
      .pipe(
        take(1),
        switchMap((recipes) => this.http.put(this.firebaseRecipesUrl, recipes))
      )
      .subscribe(() => {});
  }

  public loadRecipes(): void {
    this.http
      .get<Recipe[]>(this.firebaseRecipesUrl)
      .pipe(
        map((recipes) =>
          recipes.map((recipe) => ({
            ...recipe,
            ingredients: recipe.ingredients || [],
          }))
        )
      )
      .subscribe((recipes) => {
        this.recipesService.setRecipes(recipes);
      });
  }
}
