import { Component, OnInit } from '@angular/core';
import { Recipe } from '../models/recipe.model';

@Component({
  selector: 'app-recipes-panel',
  templateUrl: './recipes-panel.component.html',
  styleUrls: ['./recipes-panel.component.css']
})
export class RecipesPanelComponent implements OnInit {
  public selectedRecipe: Recipe;

  constructor() { }

  ngOnInit(): void {
  }

  public onRecipeSelected(recipe: Recipe): void {
    this.selectedRecipe = recipe;
  }
}
