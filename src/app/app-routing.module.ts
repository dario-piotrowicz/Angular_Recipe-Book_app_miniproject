import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoRecipeDetailsComponent } from './recipes-panel/no-recipe-details/no-recipe-details.component';
import { RecipeDetailsComponent } from './recipes-panel/recipe-details/recipe-details.component';
import { RecipeEditorComponent } from './recipes-panel/recipe-editor/recipe-editor.component';

import { RecipesPanelComponent } from './recipes-panel/recipes-panel.component';
import { ShoppigListPanelComponent } from './shoppig-list-panel/shoppig-list-panel.component';

import { AvailableRecipeGuard } from './guards/available-recipe.guard';
import { AuthPageComponent } from './auth-page/auth-page.component';

const appRoutes: Routes = [
  {
    path: '',
    redirectTo: '/recipes',
    pathMatch: 'full',
  },
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
  {
    path: 'shopping-list',
    component: ShoppigListPanelComponent,
  },
  {
    path: 'auth',
    component: AuthPageComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
