import { Ingredient } from '../models/ingredient.model';

export interface ShoppingListState {
  ingredientsList: Ingredient[];
}

export interface AppState {
  shoppingList: ShoppingListState;
}
