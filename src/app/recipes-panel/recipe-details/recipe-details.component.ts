import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css']
})
export class RecipeDetailsComponent implements OnInit {
  public recipe: Recipe;

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute, private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.route.params.subscribe( params =>
      this.recipe = this.recipesService.getRecipeById(params['id'])
    )
  }

  public onAddIngredientsToShoppingListEventHandler(): void {
    this.shoppingListService.addItemsToIngredientsList(this.recipe.ingredients);
  }

}
