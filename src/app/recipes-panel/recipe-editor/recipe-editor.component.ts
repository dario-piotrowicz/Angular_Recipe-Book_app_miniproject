import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from 'src/app/models/ingredient.model';
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
  public ingredientsFormArray: FormArray;

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

  public onFormSubmit(): void {
    console.log({ form: this.form });
  }

  public addIngredientFormGroup(ingredient?: Ingredient): void {
    const ingredientFormGroup = new FormGroup({
      name: new FormControl(
        ingredient ? ingredient.name : null,
        Validators.required
      ),
      amount: new FormControl(ingredient ? ingredient.amount : null, [
        Validators.required,
        Validators.pattern('[1-9]+[0-9]*'),
      ]),
    });
    this.ingredientsFormArray.push(ingredientFormGroup);
  }

  private initForm(): void {
    const correctlyInEditMode = this.editMode && this.recipe;

    const initRecipeName = correctlyInEditMode ? this.recipe.name : '';
    const initRecipeImageUrl = correctlyInEditMode ? this.recipe.imageUrl : '';
    const initRecipeDescription = correctlyInEditMode
      ? this.recipe.description
      : '';

    this.ingredientsFormArray = new FormArray([]);
    if (correctlyInEditMode && this.recipe.ingredients) {
      this.recipe.ingredients.forEach((ingredient) =>
        this.addIngredientFormGroup(ingredient)
      );
    }

    this.form = new FormGroup({
      name: new FormControl(initRecipeName, Validators.required),
      imageUrl: new FormControl(initRecipeImageUrl, Validators.required),
      description: new FormControl(initRecipeDescription, Validators.required),
      ingredients: this.ingredientsFormArray,
    });
  }
}
