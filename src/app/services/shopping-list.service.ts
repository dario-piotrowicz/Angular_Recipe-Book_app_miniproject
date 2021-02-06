import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable, Subject } from 'rxjs';

import { selectIngredientsList } from '../store/selectors/shopping-list.selectors';
import * as ShoppingListActions from '../store/actions/shopping-list.actions';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private _ingredientItemSelectedForEditing = new Subject<number>();

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

  public publishIngredientItemSelectedForEditing(index: number) {
    this._ingredientItemSelectedForEditing.next(index);
  }

  public get onIngredientItemSelectedForEditing(): Observable<number> {
    return this._ingredientItemSelectedForEditing.asObservable();
  }

  public getIngredientAt(index: number): Ingredient {
    return null;
    // if (index < 0 || index >= this._ingredientsList.length) {
    //   return null;
    // } else {
    //   return { ...this._ingredientsList[index] };
    // }
  }

  public setIngredientAt(index: number, ingredient: Ingredient): void {
    // if (index >= 0 || index < this._ingredientsList.length) {
    //   this._ingredientsList[index] = { ...ingredient };
    //   this._ingredientsListChanged.next();
    // }
  }

  public deletetIngredientAt(index: number): void {
    // if (index >= 0 || index < this._ingredientsList.length) {
    //   this._ingredientsList.splice(index, 1);
    //   this._ingredientsListChanged.next();
    // }
  }
}
