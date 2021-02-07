import { Ingredient } from '../models/ingredient.model';
import { User } from '../models/user.model';

export interface ShoppingListState {
  ingredientsList: Ingredient[];
  indexOfIngredientSelectedForEditing: number;
}

export interface AuthState {
  user: User;
}

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
}
