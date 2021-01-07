import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Recipe } from 'src/app/models/recipe.model';

import { RecipesService } from 'src/app/services/recipes.service';

@Component({
  selector: 'app-recipe-editor',
  templateUrl: './recipe-editor.component.html',
  styleUrls: ['./recipe-editor.component.css'],
})
export class RecipeEditorComponent implements OnInit {
  public recipe: Recipe = null;
  public editMode = false;

  public form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.recipe = this.recipesService.getRecipeById(params['id']);
      } else {
        this.recipe = null;
      }
      this.editMode = !!id;
      this.initForm();
    });
  }

  private initForm(): void {
    const correctlyInEditMode = this.editMode && this.recipe;

    const initRecipeName = correctlyInEditMode ? this.recipe.name : '';
    const initRecipeImageUrl = correctlyInEditMode ? this.recipe.imageUrl : '';
    const initRecipeDescription = correctlyInEditMode
      ? this.recipe.description
      : '';

    this.form = new FormGroup({
      name: new FormControl(initRecipeName),
      imageUrl: new FormControl(initRecipeImageUrl),
      description: new FormControl(initRecipeDescription),
    });
  }
}
