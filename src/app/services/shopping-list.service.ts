import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root',
})
export class ShoppingListService {
  private _ingredientsListChanged = new Subject<void>();

  private _ingredientItemSelectedForEditing = new Subject<number>();

  private _ingredientsList: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ];

  constructor() {}

  public get ingredientsList(): Ingredient[] {
    return this._ingredientsList.slice();
  }

  public addItemsToIngredientsList(items: Ingredient[]) {
    items.forEach((item) => this._ingredientsList.push({ ...item }));
    this._ingredientsListChanged.next();
  }

  public get onIngredientsListChanged(): Observable<void> {
    return this._ingredientsListChanged.asObservable();
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

  public setIngredientAt(index: number, ingredient: Ingredient): void {
    if (index >= 0 || index < this._ingredientsList.length) {
      this._ingredientsList[index] = { ...ingredient };
      this._ingredientsListChanged.next();
    }
  }
}
