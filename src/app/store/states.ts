import { Ingredient } from '../models/ingredient.model';
import { Recipe } from '../models/recipe.model';
import { User } from '../models/user.model';

export interface ShoppingListState {
  ingredientsList: Ingredient[];
  indexOfIngredientSelectedForEditing: number;
}

export interface AuthState {
  user: User;
  loading: boolean;
  errorMessage?: string;
}

export interface RecipesState {
  recipes: Recipe[];
}

export interface AppState {
  shoppingList: ShoppingListState;
  auth: AuthState;
  recipes: RecipesState;
}
