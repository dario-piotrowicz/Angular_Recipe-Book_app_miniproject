import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

import { Ingredient } from '../models/ingredient.model';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  private _ingredientsListChanged = new Subject<void>();

  private _ingredientsList: Ingredient[] = [
    new Ingredient('apples', 5),
    new Ingredient('tomatoes', 10),
  ];

  constructor() { }

  public get ingredientsList(): Ingredient[] {
    return this._ingredientsList.slice();
  }

  public addItemsToIngredientsList(items: Ingredient[]){
    items.forEach(
      item => this._ingredientsList.push({...item})
    );
    this._ingredientsListChanged.next();
  }

  public get onIngredientsListChanged(): Observable<void> {
    return this._ingredientsListChanged.asObservable();
  }

}
