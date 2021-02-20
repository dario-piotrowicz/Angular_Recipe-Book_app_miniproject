import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap, switchMap } from 'rxjs/operators';
import { Recipe } from 'src/app/models/recipe.model';
import { RecipesService } from 'src/app/services/recipes.service';
import { ShoppingListService } from 'src/app/services/shopping-list.service';

@Component({
  selector: 'app-recipe-details',
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.css'],
})
export class RecipeDetailsComponent implements OnInit {
  public recipe: Recipe;

  constructor(
    private shoppingListService: ShoppingListService,
    private router: Router,
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params
      .pipe(
        mergeMap((params) => this.recipesService.getRecipeById(params['id']))
      )
      .subscribe((recipe) => (this.recipe = recipe));
  }

  public onAddIngredientsToShoppingListEventHandler(): void {
    this.shoppingListService.addItemsToIngredientsList(this.recipe.ingredients);
  }

  public onDeleteRecipeEventHandler(): void {
    this.recipesService.deleteRecipe(this.recipe.id);
    this.router.navigateByUrl('/recipes');
  }
}
