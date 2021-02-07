import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectSelectedIngredientForEditing,
  selectIngredientsList,
} from '../store/selectors/shopping-list.selectors';
import * as ShoppingListActions from '../store/actions/shopping-list.actions';

import { Ingredient } from '../models/ingredient.model';
import { map, take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private _ingredientsList$: Observable<Ingredient[]> = null;

  constructor(private store: Store) {
    this._ingredientsList$ = this.store.select(selectIngredientsList);
  }

  public get ingredientsList$(): Observable<Ingredient[]> {
    return this._ingredientsList$;
  }

  public addItemsToIngredientsList(items: Ingredient[]) {
    this.store.dispatch(
      ShoppingListActions.addIngredients({ ingredients: items })
    );
  }

  public selectIngredientForEditing(index: number) {
    this.store.dispatch(
      ShoppingListActions.selectIngredientForEditing({ index })
    );
  }

  public unselectIngredientForEditing() {
    this.store.dispatch(ShoppingListActions.unselectIngredientForEditing());
  }

  public get selectedIngredientForEditing(): Observable<Ingredient> {
    return this.store.select(selectSelectedIngredientForEditing);
  }

  public updateSelectedIngredient(ingredient: Ingredient): void {
    this.store.dispatch(
      ShoppingListActions.updateSelectedIngredient({ ingredient })
    );
  }

  public deletetSelectedIngredient(): void {
    this.store.dispatch(ShoppingListActions.deleteSelectedIngredient());
  }
}
