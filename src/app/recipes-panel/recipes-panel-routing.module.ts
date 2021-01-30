import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { NoRecipeDetailsComponent } from './no-recipe-details/no-recipe-details.component';
import { RecipeDetailsComponent } from './recipe-details/recipe-details.component';
import { RecipeEditorComponent } from './recipe-editor/recipe-editor.component';
import { RecipesPanelComponent } from './recipes-panel.component';

import { AvailableRecipeGuard } from '../guards/available-recipe.guard';

const recipesPanelRouters: Routes = [
  {
    path: 'recipes',
    component: RecipesPanelComponent,
    children: [
      {
        path: '',
        component: NoRecipeDetailsComponent,
      },
      {
        path: 'new',
        component: RecipeEditorComponent,
      },
      {
        path: ':id/edit',
        component: RecipeEditorComponent,
        canActivate: [AvailableRecipeGuard],
      },
      {
        path: ':id',
        component: RecipeDetailsComponent,
        canActivate: [AvailableRecipeGuard],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(recipesPanelRouters)],
  exports: [RouterModule],
})
export class RecipesPanelRoutingModule {}
