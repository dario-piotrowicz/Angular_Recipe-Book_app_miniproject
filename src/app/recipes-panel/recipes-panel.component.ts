import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';
import { RecipesService } from '../services/recipes.service';

@Component({
  selector: 'app-recipes-panel',
  templateUrl: './recipes-panel.component.html',
  styleUrls: ['./recipes-panel.component.css']
})
export class RecipesPanelComponent implements OnInit {
  public selectedRecipe: Recipe;

  constructor(private recipesService: RecipesService) { }

  ngOnInit(): void {
    this.recipesService.onRecipeSelected.subscribe( recipe => this.selectedRecipe = recipe );
  }
}
