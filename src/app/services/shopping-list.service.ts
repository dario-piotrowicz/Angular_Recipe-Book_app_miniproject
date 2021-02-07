import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import {
  selectIndexOfIngredientSelectedForEditing,
  selectIngredientsList,
} from '../store/selectors/shopping-list.selectors';
import * as ShoppingListActions from '../store/actions/shopping-list.actions';

import { Ingredient } from '../models/ingredient.model';
import { map, min, take, tap } from 'rxjs/operators';

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
    this.store.dispatch(
      ShoppingListActions.selectIngredientForEditing({ index: -1 })
    );
  }

  public get indexOfIngredientItemSelectedForEditing(): Observable<number> {
    return this.store.select(selectIndexOfIngredientSelectedForEditing);
  }

  public getIngredientAt(index: number): Observable<Ingredient> {
    return this._ingredientsList$.pipe(
      take(1),
      map((ingredientsList) =>
        index >= 0 && index < ingredientsList.length
          ? ingredientsList[index]
          : null
      )
    );
  }

  public updateIngredientAt(index: number, ingredient: Ingredient): void {
    this.store.dispatch(
      ShoppingListActions.updateIngredientAt({ index, ingredient })
    );
    this.unselectIngredientForEditing();
  }

  public deletetIngredientAt(index: number): void {
    this.store.dispatch(ShoppingListActions.deleteIngredientAt({ index }));
    this.unselectIngredientForEditing();
  }
}
