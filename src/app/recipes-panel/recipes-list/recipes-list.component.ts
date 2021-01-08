import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Recipe } from '../../models/recipe.model';

import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit, OnDestroy {
  public recipes: Recipe[] = [];
  private recipeListChangeSubscription: Subscription;

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    const updateRecipes = () => (this.recipes = this.recipesService.recipes);

    updateRecipes();
    this.recipeListChangeSubscription = this.recipesService.onRecipesListChanged.subscribe(
      updateRecipes
    );
  }

  ngOnDestroy(): void {
    this.recipeListChangeSubscription.unsubscribe();
  }
}
