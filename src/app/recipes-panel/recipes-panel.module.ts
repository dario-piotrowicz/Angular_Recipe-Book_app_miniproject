import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

import { RecipesPanelRoutingModule } from './recipes-panel-routing.module';

import { RecipesPanelComponent } from './recipes-panel.component';
import { RecipesListComponent } from './recipes-list/recipes-list.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipesListItemComponent } from './recipes-list/recipes-list-item/recipes-list-item.component';
import { NoRecipeDetailsComponent } from './no-recipe-details/no-recipe-details.component';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';

@NgModule({
  declarations: [
    RecipesPanelComponent,
    RecipesListComponent,
    RecipeDetailsComponent,
    NoRecipeDetailsComponent,
    RecipesListItemComponent,
    RecipeEditorComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    RecipesPanelRoutingModule,
  ],
})
export class RecipesPanelModule {}
