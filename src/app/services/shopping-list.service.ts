import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { selectIngredientsList } from '../store/selectors/shopping-list.selectors';
import * as ShoppingListActions from '../store/actions/shopping-list.actions';

import { Ingredient } from '../models/ingredient.model';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private _ingredientItemSelectedForEditing = new Subject<number>();

  private _ingredientsList: Ingredient[] = null;
  private _ingredientsList$: Observable<Ingredient[]> = null;

  constructor(private store: Store) {
    this._ingredientsList$ = this.store
      .select(selectIngredientsList)
      .pipe(
        tap((ingredientsList) => (this._ingredientsList = ingredientsList))
      );
  }

  public get ingredientsList$(): Observable<Ingredient[]> {
    return this._ingredientsList$;
  }

  public addItemsToIngredientsList(items: Ingredient[]) {
    this.store.dispatch(
      ShoppingListActions.addIngredients({ ingredients: items })
    );
  }

  public publishIngredientItemSelectedForEditing(index: number) {
    this._ingredientItemSelectedForEditing.next(index);
  }

  public get onIngredientItemSelectedForEditing(): Observable<number> {
    return this._ingredientItemSelectedForEditing.asObservable();
  }

  public getIngredientAt(index: number): Ingredient {
    if (index < 0 || index >= this._ingredientsList.length) {
      return null;
    } else {
      return { ...this._ingredientsList[index] };
    }
  }

  public updateIngredientAt(index: number, ingredient: Ingredient): void {
    this.store.dispatch(
      ShoppingListActions.updateIngredientAt({ index, ingredient })
    );
  }

  public deletetIngredientAt(index: number): void {
    this.store.dispatch(ShoppingListActions.deleteIngredientAt({ index }));
  }
}
