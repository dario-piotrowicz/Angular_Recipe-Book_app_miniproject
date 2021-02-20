import { Component, OnInit } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
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
    private router: Router,
    private recipesService: RecipesService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      const id = params['id'];
      if (id) {
        this.recipesService
          .getRecipeById(params['id'])
          .subscribe((recipe) => (this.recipe = recipe));
      } else {
        this.recipe = null;
      }
      this.editMode = !!id;
      this.initForm();
    });
  }

  public onFormSubmit(): void {
    const newOrUpdatedRecipe = new Recipe(
      null,
      this.form.value.name,
      this.form.value.description,
      this.form.value.imageUrl,
      this.form.value.ingredients
    );
    if (this.editMode) {
      newOrUpdatedRecipe.id = this.recipe.id;
      this.recipesService.updateRecipe(this.recipe.id, newOrUpdatedRecipe);
    } else {
      newOrUpdatedRecipe.id = this.generateRandomRecipeId();
      this.recipesService.addRecipe(newOrUpdatedRecipe);
    }
    this.navigateToBaseRecipesPanel();
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

  public navigateToBaseRecipesPanel(): void {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  public deleteIngredientFormControlAt(index: number): void {
    this.ingredientsFormArray.removeAt(index);
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

  private generateRandomRecipeId(): string {
    var result = '';
    var characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < 10; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return `recipe-${result}`;
  }
}
