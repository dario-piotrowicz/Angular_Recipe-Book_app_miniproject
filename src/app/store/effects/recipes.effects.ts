import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { of } from 'rxjs';
import { catchError, filter, map, switchMap, take } from 'rxjs/operators';

import { Actions, createEffect, ofType } from '@ngrx/effects';

import * as RecipesActions from '../actions/recipes.actions';

import { Recipe } from '../../models/recipe.model';
import { RecipesService } from '../../services/recipes.service';

@Injectable()
export class RecipesEffects {
  private readonly firebaseRealtimeDatabaseUrl =
    'https://angular-recipe-book-app-be-default-rtdb.firebaseio.com';

  private readonly firebaseRecipesUrl = `${this.firebaseRealtimeDatabaseUrl}/recipes.json`;

  constructor(
    private actions: Actions,
    private http: HttpClient,
    private recipesService: RecipesService
  ) {}

  saveRecipes = createEffect(
    () =>
      this.actions.pipe(
        ofType(RecipesActions.saveRecipes),
        switchMap(() => this.recipesService.getRecipes()),
        take(1),
        switchMap((recipes) => this.http.put(this.firebaseRecipesUrl, recipes))
      ),
    { dispatch: false }
  );

  loadRecipes = createEffect(() =>
    this.actions.pipe(
      ofType(RecipesActions.loadRecipes),
      switchMap(() =>
        this.http.get<Recipe[]>(this.firebaseRecipesUrl).pipe(
          map((recipes) =>
            recipes.map((recipe) => ({
              ...recipe,
              ingredients: recipe.ingredients || [],
            }))
          ),
          catchError(() => of(null))
        )
      ),
      filter((recipes) => !!recipes),
      map((recipes) => {
        return RecipesActions.resetRecipes({ recipes });
      })
    )
  );
}
