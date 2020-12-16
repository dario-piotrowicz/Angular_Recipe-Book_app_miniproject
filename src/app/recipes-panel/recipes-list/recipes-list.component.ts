import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Recipe } from '../../models/recipe.model';

import { RecipesService } from '../../services/recipes.service';

@Component({
  selector: 'app-recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.css'],
})
export class RecipesListComponent implements OnInit {
  @Output() recipeSelected = new EventEmitter<Recipe>();

  public recipes: Recipe[] = [];

  constructor(private recipesService: RecipesService) {}

  ngOnInit(): void {
    this.recipes = this.recipesService.recipes;
  }

  public onRecipeSelected(recipe: Recipe): void {
    this.recipeSelected.emit(recipe);
  }
}
