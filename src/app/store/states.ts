import { Ingredient } from '../models/ingredient.model';

export interface ShoppingListState {
  ingredientsList: Ingredient[];
  indexOfIngredientSelectedForEditing: number;
}

export interface AppState {
  shoppingList: ShoppingListState;
}
